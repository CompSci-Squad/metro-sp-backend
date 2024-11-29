import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { CreatePassengerDto } from "../dto/create-passenger.dto";
import { ValidatePassengerStrategy } from "../interfaces/validate-passenger.interface";
import { PassengerEntity } from "../entities/passenger";
import { JustificationType } from "../enums/justification-type.enum";
import {
	PassengerValidatorAgeStrategy,
	PassengerValidatorUnemployedStrategy,
	PassengerValidatorPoliceOfficerStrategy,
} from "../strategies";
import { PassengerRepository } from "../repositories/passenger.repository";
import { ulid } from "ulid";
import { CryptographyUtils } from "../../../shared/utils/cryptography.utils";
import { AICreateImageRepository } from "../../ai/repository/ai-create-image.repository";
import { S3ConfigProvider } from "../../../shared/providers/s3-config.provider";
import {
	PutObjectCommand,
	PutObjectCommandInput,
	S3,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { FileUtils } from "../../../shared/utils/file.utils";

@Injectable()
export class PassengerCreatorContextService {
	private readonly logger = new Logger(PassengerCreatorContextService.name);
	private strategy: ValidatePassengerStrategy;
	private readonly strategyMap: Record<
		JustificationType,
		ValidatePassengerStrategy
	>;
	private readonly s3Provider: S3ConfigProvider;

	constructor(
		private readonly ageStrategy: PassengerValidatorAgeStrategy,
		private readonly unemployedStrategy: PassengerValidatorUnemployedStrategy,
		private readonly policeOfficerStrategy: PassengerValidatorPoliceOfficerStrategy,
		private readonly clientRepository: PassengerRepository,
		private readonly cryptographyUtil: CryptographyUtils,
		private readonly aiCreateImage: AICreateImageRepository,
		private readonly configService: ConfigService
	) {
		this.s3Provider = S3ConfigProvider.getInstance();
		this.strategyMap = {
			[JustificationType.AGE]: this.ageStrategy,
			[JustificationType.UNEMPLOYED]: this.unemployedStrategy,
			[JustificationType.POLICEOFFICER]: this.policeOfficerStrategy,
			[JustificationType.PCD]: null,
		};
	}

	private setStrategy(strategy: ValidatePassengerStrategy) {
		this.strategy = strategy;
	}

	private async uploadS3(file: Buffer, bucket: string, imageKey: string) {
		const region = this.configService.get("AWS_REGION");
		const s3 = this.s3Provider.getS3();
		const s3Params: PutObjectCommandInput = {
			Bucket: bucket,
			Key: imageKey,
			Body: file,
			ContentType: "image/jpeg",
		};

		try {
			await s3.send(new PutObjectCommand(s3Params));
			this.logger.log(`Image uploaded successfully to S3: ${imageKey}`);
			return `https://${bucket}.s3.${region}.amazonaws.com/${imageKey}`;
		} catch (err) {
			this.logger.error("Error uploading image:", err);
			throw new InternalServerErrorException("Image upload failed");
		}
	}

	public async create(
		data: CreatePassengerDto,
		image: Express.Multer.File
	): Promise<PassengerEntity> {
		try {
			const strategy = this.strategyMap[data.justificationType];

			if (!strategy && strategy !== null) {
				throw new BadRequestException("Invalid justification type");
			}

			this.setStrategy(strategy);

			if (
				this.strategy !== null &&
				!(await this.strategy.validate(data.justificationDetails))
			) {
				throw new BadRequestException("Invalid justification details");
			}
			const passengerEntity = new PassengerEntity({
				...data,
				id: ulid(),
				cpf: this.cryptographyUtil.encrypt(data.cpf),
			});

			const imageKey = `passengers/${passengerEntity.id}-${passengerEntity.createdAt}.jpg`;
			const imageUrl = await this.uploadS3(
				image.buffer,
				this.s3Provider.getBucketName(),
				imageKey
			);

			const imageBase64 = FileUtils.toBase64(image);

			const [passenger, aiImage] = await Promise.allSettled([
				this.clientRepository.createItem({
					...passengerEntity,
					image: imageUrl,
				}),
				this.aiCreateImage.createImage(imageBase64, passengerEntity.cpf),
			]);
			if (aiImage.status === "rejected") {
				await this.clientRepository.deleteItem({
					id: passengerEntity.id,
					cpf: passengerEntity.cpf,
				});
				throw new InternalServerErrorException(
					`AI image creation failed: ${aiImage.reason}`
				);
			}
			if (passenger.status === "rejected") {
				throw new InternalServerErrorException(passenger.reason);
			}
			return passenger.value;
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}

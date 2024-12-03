import { Injectable } from "@nestjs/common";
import { AISearchRepository } from "../repository/ai-search.repository";
import { LogRepository } from "../../log/repositories/log.repository";
import { ulid } from "ulid";
import dayjs from "dayjs";
import { LogLevel } from "../../log/enums/log-level.enum";

@Injectable()
export class SearchForImageService {
	constructor(
		private readonly aiSearchRepository: AISearchRepository,
		private readonly logRepository: LogRepository
	) {}

	public async searchForImage(image: string): Promise<any> {
		const response = await this.aiSearchRepository.searchByImage<{
			recognized: boolean;
			message: string;
			cpf: string;
		}>(image);
		if (!response.recognized) {
			await this.logRepository.createItem({
				id: ulid(),
				message: `usuário não reconhecido`,
				level: LogLevel.INFO,
				timestamp: dayjs().toISOString(),
			});
			return { recognized: false, message: "Imagem não reconhecida" };
		}

		await this.logRepository.createItem({
			id: ulid(),
			message: `usuário com CPF: ${response.cpf} reconhecido, entrada liberada`,
			level: LogLevel.INFO,
			timestamp: dayjs().toISOString(),
		});

		return {
			recognized: true,
			message: `Imagem reconhecida para usuário com CPF ${response.cpf}`,
		};
	}
}

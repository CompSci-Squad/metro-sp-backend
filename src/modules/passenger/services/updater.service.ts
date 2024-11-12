import { Injectable, Logger } from "@nestjs/common";
import { PassengerRepository } from "../repositories/passenger.repository";
import { UpdatePassengerDto } from "../dto/update-passenger.dto";
import { PassengerEntity } from "../entities/passenger";

@Injectable()
export class UpdaterService {
	private readonly logger = new Logger(UpdaterService.name);

	constructor(private readonly passengerRepository: PassengerRepository) {}

	public async update(id: string, dto: UpdatePassengerDto) {
		const updateExpressionParts: string[] = [];
		const expressionValues: Record<string, any> = {};

		Object.keys(dto).forEach((key) => {
			const attributeKey = `:${key}`;
			updateExpressionParts.push(`${key} = ${attributeKey}`);
			expressionValues[attributeKey] = dto[key as keyof PassengerEntity];
		});

		const updateExpression = `SET ${updateExpressionParts.join(", ")}`;

		await this.passengerRepository.updateItemById(
			id,
			updateExpression,
			expressionValues
		);
	}
}

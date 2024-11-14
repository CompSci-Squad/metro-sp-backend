import { Injectable, Logger } from "@nestjs/common";
import { PassengerRepository } from "../repositories/passenger.repository";
import { UpdatePassengerDto } from "../dto/update-passenger.dto";
import { PassengerEntity } from "../entities/passenger";
import dayjs from "dayjs";

@Injectable()
export class UpdaterService {
	private readonly logger = new Logger(UpdaterService.name);

	constructor(private readonly passengerRepository: PassengerRepository) {}

	public async update(passengerId: string, dto: UpdatePassengerDto) {
		const updateExpressionParts: string[] = [];
		const expressionValues: Record<string, any> = {};
		const expressionAttributeNames: Record<string, string> = {};

		const { id, cpf } = await this.passengerRepository.getItemById(passengerId);

		Object.keys(dto).forEach((key) => {
			const attributeKey = `:${key}`;
			if (key === "name") {
				updateExpressionParts.push(`#${key} = ${attributeKey}`);
				expressionAttributeNames[`#${key}`] = key;
			} else {
				updateExpressionParts.push(`${key} = ${attributeKey}`);
			}
			expressionValues[attributeKey] = dto[key as keyof PassengerEntity];
		});

		const updatedAtKey = ":updatedAt";
		updateExpressionParts.push(`updatedAt = ${updatedAtKey}`);
		expressionValues[updatedAtKey] = dayjs().toISOString();

		const updateExpression = `SET ${updateExpressionParts.join(", ")}`;

		return await this.passengerRepository.updateItem(
			{ id, cpf },
			updateExpression,
			expressionValues,
			expressionAttributeNames
		);
	}
}

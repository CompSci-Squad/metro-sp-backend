import { Injectable } from "@nestjs/common";
import { ValidatePassengerStrategy } from "../interfaces/validate-passenger.interface";

@Injectable()
export class PassengerValidatorPoliceOfficerStrategy
	implements ValidatePassengerStrategy
{
	constructor() {}
	public async validate(justificationDetails: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const regex = /^[0-9]{8}$/;
			if (regex.test(justificationDetails)) {
				resolve(true);
			} else {
				reject(false);
			}
		});
	}
}

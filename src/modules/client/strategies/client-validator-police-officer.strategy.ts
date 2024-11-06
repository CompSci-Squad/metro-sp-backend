import { Injectable } from "@nestjs/common";
import { CreateClientStrategy } from "../interfaces/create-client.interface";

@Injectable()
export class ClientValidatorPoliceOfficerStrategy
	implements CreateClientStrategy
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

import { Injectable } from "@nestjs/common";
import { CreateClientStrategy } from "../interfaces/create-client.interface";
import dayjs from "dayjs";

@Injectable()
export class ClientValidatorAgeStrategy implements CreateClientStrategy {
	constructor() {}
	public async validate(justificationDetail: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const age = dayjs().diff(dayjs(justificationDetail), "year");
			if (age >= 60) {
				resolve(true);
			} else {
				reject(false);
			}
		});
	}
}

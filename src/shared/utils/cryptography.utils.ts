import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "node:crypto";

@Injectable()
export class CryptographyUtils {
	private readonly algorithm: string = "aes-256-cbc";
	private readonly secretKey: Buffer;

	constructor(private readonly configService: ConfigService) {
		const key = this.configService.get<string>("ENCRYPTION_SECRET_KEY");
		if (!key) {
			throw new Error(
				"ENCRYPTION_SECRET_KEY is not set in the environment variables."
			);
		}
		this.secretKey = Buffer.from(key, "utf8");
	}

	public encrypt(value: string): string {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

		const encrypted = Buffer.concat([
			cipher.update(value, "utf8"),
			cipher.final(),
		]);

		return `${iv.toString("base64")}:${encrypted.toString("base64")}`;
	}

	public decrypt(value: string): string {
		const [ivBase64, encryptedDataBase64] = value.split(":");
		if (!ivBase64 || !encryptedDataBase64) {
			throw new Error(
				"Invalid encrypted format. Expected format: iv:encryptedData"
			);
		}

		const iv = Buffer.from(ivBase64, "base64");
		const encryptedData = Buffer.from(encryptedDataBase64, "base64");

		const decipher = crypto.createDecipheriv(
			this.algorithm,
			this.secretKey,
			iv
		);

		const decrypted = Buffer.concat([
			decipher.update(encryptedData),
			decipher.final(),
		]);

		return decrypted.toString("utf8");
	}
}

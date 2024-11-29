import * as crypto from 'node:crypto'
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptographyUtils {
	private readonly algorithm: string = "aes-256-cbc";
	private readonly secretKey: Buffer;
	private readonly fixedIv: Buffer = Buffer.from("1234567890123456", "utf8"); // Use a fixed IV (16 bytes)

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
		// Use the fixed IV for encryption
		const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.fixedIv);

		const encrypted = Buffer.concat([
			cipher.update(value, "utf8"),
			cipher.final(),
		]);

		// Return the encrypted data as a base64 string
		return encrypted.toString("base64");
	}

	public decrypt(value: string): string {
		const encryptedData = Buffer.from(value, "base64");

		const decipher = crypto.createDecipheriv(
			this.algorithm,
			this.secretKey,
			this.fixedIv
		);

		const decrypted = Buffer.concat([
			decipher.update(encryptedData),
			decipher.final(),
		]);

		return decrypted.toString("utf8");
	}
}

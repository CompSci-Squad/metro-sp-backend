import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';

@Injectable()
export class EncryptionUtil {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey: string
  private readonly iv = crypto.randomBytes(16);

  constructor(private readonly configService: ConfigService) {
    this.secretKey = configService.get("SECRET_KEY")
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    const [ivHex, encryptedData] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(ivHex, 'hex'),
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

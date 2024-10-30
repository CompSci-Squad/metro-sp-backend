import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';

@Injectable()
export class CryptographyUtils {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey: Buffer;

  constructor(private readonly configService: ConfigService) {
    // Fetch the secret key from configuration and ensure it's 32 bytes
    const key = this.configService.get<string>('ENCRYPTION_SECRET_KEY');
    if (!key || key.length !== 32) {
      throw new Error('ENCRYPTION_SECRET_KEY must be a 32-character string.');
    }
    this.secretKey = Buffer.from(key);
  }

  public encrypt(value: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  public decrypt(value: string): string {
    const [ivString, encryptedData] = value.split(':');
    const ivBuffer = Buffer.from(ivString, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      ivBuffer,
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

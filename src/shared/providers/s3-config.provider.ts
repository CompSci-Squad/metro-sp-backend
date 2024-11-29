import { Injectable, Logger } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';

@Injectable()
export class S3ConfigProvider {
  private static instance: S3ConfigProvider;
  private readonly _s3: S3;
  private readonly _bucketName: string;
  private readonly logger = new Logger(S3ConfigProvider.name);

  private constructor() {
    this._bucketName = process.env.AWS_BUCKET_NAME ?? 'testbucket';
    this._s3 = new S3({
      endpoint: process.env.LOCALSTACK_URL ?? 'http://localhost:4566',
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'test',
      },
      forcePathStyle: true,
    });

    this.createBucketIfNotExists();
  }

  public static getInstance(): S3ConfigProvider {
    if (!S3ConfigProvider.instance) {
      S3ConfigProvider.instance = new S3ConfigProvider();
    }
    return S3ConfigProvider.instance;
  }

  public getS3(): S3 {
    return this._s3;
  }

  public getBucketName(): string {
    return this._bucketName;
  }

  private async createBucketIfNotExists(): Promise<void> {
    try {
      await this._s3.headBucket({ Bucket: this._bucketName });
      this.logger.log(`Bucket "${this._bucketName}" already exists.`);
    } catch (err) {
      if (err.name === 'NotFound') {
        try {
          await this._s3.createBucket({ Bucket: this._bucketName });
          this.logger.log(`Bucket "${this._bucketName}" created successfully.`);
        } catch (createErr) {
          this.logger.error(
            `Error creating bucket "${this._bucketName}":`,
            createErr,
          );
        }
      } else if (err.name === 'AccessDenied') {
        this.logger.error(
          `Access denied when checking the bucket "${this._bucketName}".`,
        );
      } else {
        this.logger.error(
          `Error while checking bucket "${this._bucketName}":`,
          err,
        );
      }
    }
  }

  public async listBuckets(): Promise<void> {
    try {
      const result = await this._s3.listBuckets({});
      const bucketNames = result.Buckets?.map((bucket) => bucket.Name) ?? [];
      this.logger.log('Existing Buckets:', bucketNames);
    } catch (err) {
      this.logger.error('Error listing buckets:', err);
    }
  }
}

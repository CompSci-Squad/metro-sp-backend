import { Injectable } from '@nestjs/common';
import { DataSource } from './datasource';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIDatasource extends DataSource {
  protected baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    httpService: HttpService,
  ) {
    super(httpService);
    const connectionString = configService.get<string>('ASSESSMENT_API_URL');

    this.baseUrl = connectionString;
    this.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
  }
}

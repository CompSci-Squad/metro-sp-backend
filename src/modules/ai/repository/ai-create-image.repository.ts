import { Injectable } from '@nestjs/common';
import { AIDatasource } from '../../../shared/datasources/ai.datasource';

@Injectable()
export class AICreateImageRepository {
  private endpoint = '/image';
  private readonly datasource: AIDatasource;

  constructor(private readonly dataSource: AIDatasource) {
    this.datasource = dataSource;
  }

  public async createImage(image: string, cpf: string) {
    return this.datasource.post(`${this.endpoint}`, { image, cpf });
  }
}

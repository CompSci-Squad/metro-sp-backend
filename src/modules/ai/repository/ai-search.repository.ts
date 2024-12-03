import { Injectable } from '@nestjs/common';
import { AIDatasource } from '../../../shared/datasources/ai.datasource';

@Injectable()
export class AISearchRepository {
  private endpoint = '/search';
  private readonly datasource: AIDatasource;

  constructor(private readonly dataSource: AIDatasource) {
    this.datasource = dataSource;
  }

  public async searchByImage<T>(image: string) {
    return this.datasource.post<T>(`${this.endpoint}`, { image });
  }
}

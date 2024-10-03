import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatorService {
  constructor() {}

  public async create(): Promise<string> {
    try {
      return 'usuario criado';
    } catch (error) {}
  }
}

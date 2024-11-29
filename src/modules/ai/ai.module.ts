import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AISearchRepository } from './repository/ai-search.repository';
import { AICreateImageRepository } from './repository/ai-create-image.repository';
import { AIDatasource } from '../../shared/datasources/ai.datasource';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AIController],
  providers: [AISearchRepository, AICreateImageRepository, AIDatasource],
  exports: [AICreateImageRepository],
})
export class AIModule {}

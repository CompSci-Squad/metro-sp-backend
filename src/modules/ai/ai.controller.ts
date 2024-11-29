import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SearchImageDto } from './dto/search-image.dto';
import { AISearchRepository } from './repository/ai-search.repository';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUtils } from '../../shared/utils/file.utils';

@Controller('ai')
export class AIController {
  constructor(private readonly aiSearchRepository: AISearchRepository) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async searchForImage(@UploadedFile() image: Express.Multer.File) {
    const imageBase64 = FileUtils.toBase64(image);
    return this.aiSearchRepository.searchByImage(imageBase64);
  }
}

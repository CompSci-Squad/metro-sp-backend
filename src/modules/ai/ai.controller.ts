import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUtils } from '../../shared/utils/file.utils';
import { SearchForImageService } from './services/search-for-image.service';
import { IsPublic } from '../../auth/decorators/is-public.decorator';

@Controller('ai')
export class AIController {
  constructor(private readonly searchForImageService: SearchForImageService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async searchForImage(@UploadedFile() file) {
    const imageBase64 = FileUtils.toBase64(file);
    return await this.searchForImageService.searchForImage(imageBase64);
  }
}

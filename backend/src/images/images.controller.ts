import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() body: CreateImageDto,
  ): Promise<any> {
    if (!file)
      throw new HttpException('File was not present', HttpStatus.BAD_REQUEST);

    return this.imagesService.saveFile(file, body);
  }

  @Get('/all')
  async getAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async get(@Param() params: { id: number }, @Res() res: Response) {
    const image = await this.imagesService.findOne(params.id);
    const Image = res.setHeader('Content-Type', image.mimetype);

    const file = createReadStream(
      ImagesService.TMP_IMAGE_DIR + '/' + image.filename,
    );

    file.pipe(res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}

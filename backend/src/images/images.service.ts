import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  public static TMP_IMAGE_DIR = './tmp/images';

  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  private createTmpDirIfNeeded(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const exists = fs.existsSync(ImagesService.TMP_IMAGE_DIR);

      if (!exists) {
        fs.mkdir(ImagesService.TMP_IMAGE_DIR, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }

      resolve();
    });
  }

  public async saveFile(
    file: Express.Multer.File,
    body: CreateImageDto,
  ): Promise<{ id: number }> {
    await this.createTmpDirIfNeeded();

    const filename = randomUUID() + '_' + (file.filename ?? file.originalname);
    const mimetype = file.mimetype;

    await new Promise<void>((resolve) => {
      fs.writeFile(
        ImagesService.TMP_IMAGE_DIR + '/' + filename,
        file.buffer,
        {},
        () => {
          resolve();
        },
      );
    });

    const result = await this.imagesRepository.save({
      title: body.title,
      subtitle: body.subtitle,
      index: body.index,
      mimetype: mimetype,
    });

    return {
      id: result.id,
    };
  }

  public async findOne(id: number): Promise<Image> {
    const image = await this.imagesRepository.findOneBy({ id: id });
    if (!image) throw new Error('Image not found');

    return image;
  }

  public async findAll() {
    const result = await this.imagesRepository.find({
      order: {
        index: 'ASC',
      },
    });
    return result;
  }

  public async update(id: number, updateBody: UpdateImageDto) {
    const result = await this.imagesRepository.update(
      {
        id,
      },
      updateBody,
    );
    return result;
  }

  public async remove(id: number) {
    const result = await this.imagesRepository.delete({ id });
    return result;
  }
}

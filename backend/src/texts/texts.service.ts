import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Text } from './entities/text.entity';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(Text) private textsRepository: Repository<Text>,
  ) {}

  public async create(body: CreateTextDto) {
    const result = await this.textsRepository.save({
      title: body.title,
      subtitle: body.subtitle,
      index: body.index,
      body: body.body,
    });

    return {
      id: result.id,
    };
  }

  public async findAll() {
    const result = await this.textsRepository.find({
      order: {
        index: 'ASC',
      },
    });
    return result;
  }

  public async findOne(id: number) {
    const result = await this.textsRepository.findOneBy({
      id,
    });
    return result;
  }

  public async update(id: number, updateBody: UpdateTextDto) {
    const result = await this.textsRepository.update(
      {
        id,
      },
      updateBody,
    );
    return result;
  }

  public async remove(id: number) {
    const result = await this.textsRepository.delete({ id });
    return result;
  }
}

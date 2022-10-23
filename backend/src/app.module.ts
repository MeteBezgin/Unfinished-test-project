import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImagesModule } from './images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './images/entities/image.entity';
import { TextsModule } from './texts/texts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      password: 'vlcs-tech-hiring',
      synchronize: true,
      port: 5432,
      entities: [Image],
    }),
    ImagesModule,
    TextsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

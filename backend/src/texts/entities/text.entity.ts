import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Text {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  index: number;
}

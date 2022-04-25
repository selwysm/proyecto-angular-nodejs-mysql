import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";

@Unique(["username"])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  username: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;
}

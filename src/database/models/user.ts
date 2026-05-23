import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'USER', enum: ['ADMIN', 'USER'] })
  role!: string;

  @Column({ default: true })
  companyId!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  serialNumber!: string;

  @Column({ default: true })
  companyId!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

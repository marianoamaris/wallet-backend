import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  tag?: string;

  @Column()
  chain: string;

  @Column({ unique: true })
  address: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.wallets)
  @JoinColumn({ name: "userId" })
  user: User;
}

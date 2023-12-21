import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./EUser";
import { Likes } from "./ELikes";
import { Reply } from "./EReply";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    nullable: true,
  })
  image: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  posted_at: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.threads)
  user: User;

  @OneToMany(() => Likes, (likes) => likes.thread)
  likes: Likes[];

  @OneToMany(() => Reply, (reply) => reply.thread)
  replies: Reply[];
}

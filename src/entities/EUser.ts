import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Thread } from "./EThread";
import { Likes } from "./ELikes";
import { Reply } from "./EReply";
import { Following } from "./EFollowing";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profile_picture: string;

  @Column()
  profile_detail: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Thread[];

  @OneToMany(() => Likes, (likes) => likes.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  likes: Likes[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Reply[];

  @OneToMany(() => Following, (following) => following.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  following: Following[];

  @OneToMany(() => Following, (following) => following.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  follower: Following[];
}

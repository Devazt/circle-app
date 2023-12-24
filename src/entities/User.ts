import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Follow } from "./Follow";
import { Thread } from "./Thread";
import { Reply } from "./Reply";
import { Like } from "./Like";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo_profile: string;

    @Column({ nullable: true })
    bio: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date

    @OneToMany(() => Follow, follower => follower.user)
    follower: Follow[];

    @OneToMany(() => Follow, following => following.user)
    following: Follow[];

    @OneToMany(() => Thread, threads => threads.user)
    threads: Thread[];

    @OneToMany(() => Reply, replies => replies.user)
    replies: Reply[];

    @OneToMany(() => Like, likes => likes.user)
    likes: Like[];

}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
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

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date

    @ManyToMany(() => User, (user) => user.following)
    @JoinTable({
        name: "follower",
        joinColumn: {
            name: "follower",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "following",
            referencedColumnName: "id"
        }
    })
    follower: User[]

    @ManyToMany(() => User, (user) => user.follower)
    following: User[]

    @OneToMany(() => Thread, threads => threads.user)
    threads: Thread[];

    @OneToMany(() => Reply, replies => replies.user)
    replies: Reply[];

    @OneToMany(() => Like, likes => likes.user)
    likes: Like[];

}

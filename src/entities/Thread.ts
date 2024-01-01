import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Reply } from "./Reply";
import { Like } from "./Like";


@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    content: string

    @Column({nullable: true})
    image: string

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date

    @ManyToOne(() => User, user => user.threads, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User

    @OneToMany(() => Reply, reply => reply.thread)
    replies: Reply[]

    @OneToMany(() => Like, like => like.thread)
    likes: Like[]
}
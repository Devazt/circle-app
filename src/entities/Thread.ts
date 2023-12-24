import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Reply } from "./Reply";
import { Like } from "./Like";


@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable: true})
    image: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date

    @ManyToOne(() => User, user => user.threads)
    user: User

    @OneToMany(() => Reply, reply => reply.thread)
    replies: Reply[]

    @OneToMany(() => Like, like => like.thread)
    likes: Like[]
}
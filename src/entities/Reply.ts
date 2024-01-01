import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    content: string;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;

    @ManyToOne(() => User, user => user.replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User;

    @ManyToOne(() => Thread, thread => thread.replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    thread: Thread;
}
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date

    @ManyToOne(() => User, user => user.likes, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User

    @ManyToOne(() => Thread, thread => thread.likes, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    thread: Thread
}
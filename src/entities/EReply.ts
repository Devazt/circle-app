import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./EUser";
import { Thread } from "./EThread";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => User, (user) => user.replies)
    user: User;

    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread;
}
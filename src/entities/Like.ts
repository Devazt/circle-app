import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date

    @ManyToOne(() => User, user => user.likes)
    user: User

    @ManyToOne(() => Thread, thread => thread.likes)
    thread: Thread
}
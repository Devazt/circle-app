import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(() => User, user => user.replies)
    user: User;

    @ManyToOne(() => Thread, thread => thread.replies)
    thread: Thread;
}
import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "./EUser";
import { Thread } from "./EThread";

@Entity()
export class Likes {
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

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @ManyToOne(() => Thread, (thread) => thread.likes)
    thread: Thread;


}
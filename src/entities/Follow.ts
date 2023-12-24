import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(() => User, user => user.follower)
    user: User;

    @ManyToOne(() => User, user => user.following)
    following: User;
}
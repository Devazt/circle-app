import { IFeed } from "./thread";
import { IUser } from "./user";

export default interface IReply {
    id: number;
    posted_at: string;
    updated_at: string;
    content: string;
    image: string;
    user: IUser;
    thread: IFeed
}
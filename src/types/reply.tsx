import { IFeed } from "./thread";
import { IUser } from "./user";

export default interface IReply {
    id: number;
    created_at: string;
    updated_at: string;
    content: string;
    image: string;
    user: IUser;
    thread: IFeed
}

export type IKomen = {
    content: string;
    image: string | Blob | MediaSource;
    thread: number
}
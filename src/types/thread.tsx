import { IUser } from "./user";
export interface IFeed {
    id: number;
    content: string;
    image: string;
    created_at: string;
    user: IUser
}

export type IThread = {
    content: string;
    image: string | Blob | MediaSource;
}
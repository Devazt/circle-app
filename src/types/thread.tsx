import IUser from "./user";
export default interface IFeed {
    id: number;
    content: string;
    image: string | null;
    posted_at: string;
    user: IUser
}
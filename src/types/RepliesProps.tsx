interface IUser {
    id: number;
    username: string;
    fullname: string;
    photo_profile: string;
    email: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

interface Thread {
    id: number;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface IReply {
    id: number;
    image: string | null;
    content: string;
    created_at: string;
    updated_at: string;
    user: IUser;
    thread: Thread
}

interface Reply {
    id: number;
    image: string | null;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface IReplyThread {
    id: number;
    content: string;
    image: string;
    created_at: string;
    like: {
        id: number;
        created_at: string;
        updated_at: string;
    }
    likeCount: number;
    replyCount: number;
    replies: Reply[];
    user: {
        id: number;
        username: string;
        fullname: string;
        email: string;
        photo_profile: string;
    }
}

export type UseReply = {
    content: string;
    image: string;
    thread: number;
}
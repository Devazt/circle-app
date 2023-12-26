export interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    photo_profile: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

export type IProfile = {
    id: number
    username: string
    fullname: string
    photo_profile: string
    bio: string
}

export type ISuggest = {
    id: number
    username: string
    fullname: string
    photo_profile: string
}

export type IUserAuth = {
    id?: number
    fullname?: string
    username?: string
    email?: string
}

export type IUserRegister = {
    username: string
    fullname: string
    email: string
    password: string
}

export type IUserLogin = {
    email: string
    password: string
}
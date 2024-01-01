export type IUserRegister = {
    username: string;
    fullname: string;
    email: string;
    password: string;
};

export type IUserLogin = {
    email: string;
    password: string;
};

export type IUserSearch = {
    id: number;
    username: string;
    fullname: string;
    photo_profile: string;
}
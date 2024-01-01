import { setAuthToken } from "@/lib/api";
import { IReduxUser } from "../types/reduxType";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: IReduxUser = {
    id: 0,
    fullname: "",
    username: "",
    email: "",
    photo_profile: "",
    password: "",
    bio: "",
    following: [],
    follower: [],
    numfollowers: 0,
    numfollowing: 0,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            
            setAuthToken(payload.token)
            localStorage.setItem("token", payload.token)

            const user: IReduxUser = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                photo_profile: payload.photo_profile,
                password: payload.password,
                bio: payload.bio,
                following: payload.following,
                follower: payload.follower,
                numfollowers: payload.numfollowers,
                numfollowing: payload.numfollowing,
            }

            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload

            const user: IReduxUser = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                photo_profile: payload.photo_profile,
                password: payload.password,
                bio: payload.bio,
                following: payload.following,
                follower: payload.follower,
                numfollowers: payload.numfollowers,
                numfollowing: payload.numfollowing,
            }
            return user
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
        },
    },
})


import { setAuthToken } from "@/lib/api";
import { IUserAuth } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: IUserAuth = {
    id: 0,
    fullname: "",
    username: "",
    email: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload

            setAuthToken(payload.token)
            localStorage.setItem("token", payload.token)

            const user: IUserAuth = {
                id: payload.id,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
            }

            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload

            const user: IUserAuth = {
                id: payload.user.id,
                fullname: payload.user.fullname,
                username: payload.user.username,
                email: payload.user.email,
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


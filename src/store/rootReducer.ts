import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR } = authSlice.actions;

export const authReducer = authSlice.reducer

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer
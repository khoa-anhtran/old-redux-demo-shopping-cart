import { AuthPayload, AuthResponse } from "@/pages/auth/reducers"
import api from "./api"
import { isAxiosError } from "axios"

export const postRefreshToken = async () => {
    try {
        const res = await api.post<AuthResponse>("/auth/refresh");
        return res.data;
    } catch (err) {
        if (isAxiosError(err))
            throw new Error(err?.response?.data?.message);
        else
            throw err
    }
}

export const postLogin = async (authPayload: AuthPayload) => {
    try {
        const res = await api.post<AuthResponse>("/auth/signin", authPayload);
        return res.data;
    } catch (err) {
        if (isAxiosError(err))
            throw new Error(err?.response?.data?.message);
        else
            throw err
    }
}

export const postRegister = async (authPayload: AuthPayload) => {
    try {
        const res = await api.post<AuthResponse>("/auth/register", authPayload);
        return res.data;
    } catch (err) {
        if (isAxiosError(err))
            throw new Error(err?.response?.data?.message);
        else
            throw err
    }
}

export const postLogout = async () => {
    try {
        await api.post<AuthResponse>("/auth/logout");
        return true;
    } catch (err) {
        if (isAxiosError(err))
            throw new Error(err?.response?.data?.message);

        return false
    }
}

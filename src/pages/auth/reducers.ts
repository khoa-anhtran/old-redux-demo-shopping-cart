import { PayloadAction } from "@/types";
import {
    ACCESS_TOKEN_REFRESH_FAILED,
    ACCESS_TOKEN_REFRESH_REQUESTED, ACCESS_TOKEN_REFRESHED, USER_LOGIN_FAILED,
    USER_LOGIN_SUCCEEDED, USER_LOGINED, USER_LOGOUT_FAILED, USER_LOGOUT_REQUESTED, USER_LOGOUT_SUCCEEDED, USER_REGISTER_FAILED,
    USER_REGISTER_SUCCEEDED, USER_REGISTERED
} from "./actionTypes";
import { STATUS } from "@/constants/api";

export type AuthState = {
    userId: number | null;
    email: string | null;
    accessToken?: string;
    status: string;
    error: string | null;
    refreshTokenStatus: "empty" | "existed" | "expired"
}

export type AuthResponse = {
    accessToken: string;
    user: {
        id: number;
        email: string;
    }
}

export type AuthPayload = {
    email: string;
    password: string
}

const initialState: AuthState = {
    userId: null,
    email: null,
    status: STATUS.FAIL,
    error: null,
    refreshTokenStatus: "empty"
}

type AuthPayloadAction = PayloadAction<{ message: string } | AuthResponse>

const authReducer = (state = initialState, action: AuthPayloadAction): AuthState => {
    switch (action.type) {

        case USER_LOGINED:
        case USER_REGISTERED:
        case USER_LOGOUT_REQUESTED:
        case ACCESS_TOKEN_REFRESH_REQUESTED: {
            return {
                ...state,
                status: STATUS.LOADING
            };
        }

        case USER_LOGIN_FAILED:
        case USER_REGISTER_FAILED:
        case USER_LOGOUT_FAILED: {
            const { message } = action.payload as { message: string }

            return {
                ...state,
                status: STATUS.FAIL,
                error: message
            };
        }

        case USER_LOGIN_SUCCEEDED:
        case USER_REGISTER_SUCCEEDED:
        case ACCESS_TOKEN_REFRESHED: {
            const { accessToken, user } = action.payload as AuthResponse;

            return {
                ...state,
                accessToken,
                email: user.email,
                userId: user.id,
                status: STATUS.SUCCESS
            };
        }

        case ACCESS_TOKEN_REFRESH_FAILED: {
            const { message } = action.payload as { message: string }

            const isEmpty = !!message.match(/Missing refresh token/)

            return { ...state, status: STATUS.IDLE, refreshTokenStatus: isEmpty ? "empty" : "expired" };
        }

        case USER_LOGOUT_SUCCEEDED: {
            return initialState;
        }

        default:
            return state
    }
}

export default authReducer
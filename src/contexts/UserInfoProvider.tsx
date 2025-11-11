import { AuthPayload } from "@/pages/auth/reducers";
import { postLogin, postLogout, postRefreshToken } from "@/services/authService";
import { useState, ReactNode, useCallback } from "react";
import UserInfoContext from "./UserInfoContext";

const UserInfoProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<null | number>(null);
    const [email, setEmail] = useState<null | string>(null);

    const registerAction = useCallback(async (authPayload: AuthPayload) => {
        try {
            const data = await postLogin(authPayload)

            if (data) {
                const { email, id } = data.user
                setUserId(id);
                setEmail(email)
                return;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : String(err);
            return error
        }
    }, [])

    const loginAction = useCallback(async (authPayload: AuthPayload) => {
        try {
            const data = await postLogin(authPayload)

            if (data) {
                const { email, id } = data.user
                setUserId(id);
                setEmail(email)
                return;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : String(err);
            return error
        }
    }, [])

    const logOut = useCallback(async () => {
        await postLogout()
        setUserId(null);
        setEmail(null);
    }, []);

    const refreshAction = useCallback(async () => {
        try {
            const data = await postRefreshToken()

            if (data) {
                const { email, id } = data.user
                setUserId(id);
                setEmail(email)
                return;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : String(err);
            throw error
        }
    }, [])

    return (
        <UserInfoContext value={{ userId, email, loginAction, registerAction, refreshAction, logOut }}>
            {children}
        </UserInfoContext>
    );

};

export default UserInfoProvider
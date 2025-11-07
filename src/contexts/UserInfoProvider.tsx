import { AuthPayload } from "@/pages/auth/reducers";
import { postLogin, postLogout, postRefreshToken } from "@/services/authService";
import { notify } from "@/utils/helpers";
import { useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./UserInfoContext";
import { useDispatch } from "react-redux";
import { tokenRemoved } from "@/pages/auth/actions";

const UserInfoProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch()

    const [userId, setUserId] = useState<null | number>(null);
    const [email, setEmail] = useState<null | string>(null);
    const navigate = useNavigate();

    const registerAction = useCallback(async (authPayload: AuthPayload) => {
        try {
            const data = await postLogin(authPayload)

            if (data) {
                const { email, id } = data.user
                setUserId(id);
                setEmail(email)
                notify({ status: "succeeded", message: "Register successfully" })
                navigate("/");

                return;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : String(err);

            notify({ status: "failed", error })

            return;
        }
    }, [navigate])

    const loginAction = useCallback(async (authPayload: AuthPayload) => {
        try {
            console.log(authPayload)
            const data = await postLogin(authPayload)
            console.log(data)


            if (data) {
                const { email, id } = data.user
                setUserId(id);
                setEmail(email)
                notify({ status: "succeeded", message: "Login successfully" })
                navigate("/");
                return;
            }

        } catch (err) {
            const error = err instanceof Error ? err.message : String(err);

            notify({ status: "failed", error })

            throw error;
        }
    }, [navigate])

    const logOut = useCallback(async () => {
        try {
            await postLogout()
            dispatch(tokenRemoved())
            setUserId(null);
            setEmail(null);
            navigate("/login");
        }
        catch (err) {
            const error = err instanceof Error ? err.message : String(err);
            notify({ status: "failed", error })
        }
    }, [navigate]);

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
            console.error(error)
            throw error
        }
    }, [])

    return (
        <AuthContext value={{ userId, email, loginAction, registerAction, refreshAction, logOut }}>
            {children}
        </AuthContext>
    );

};

export default UserInfoProvider
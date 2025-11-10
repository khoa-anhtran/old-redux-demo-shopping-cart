// RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth, selectAuthStatus } from "@/pages/auth/selectors";
import { STATUS } from "@/constants/api";

export default function RequireAuth() {
    const auth = useSelector(selectAuth);
    const status = useSelector(selectAuthStatus);

    const loading = (status === STATUS.LOADING) && !auth?.userId;
    if (loading) return null; // or a spinner

    if (!auth?.userId) return <Navigate to="/login" replace />;

    return <Outlet />;
}

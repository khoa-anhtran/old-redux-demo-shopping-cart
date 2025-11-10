import useAuth from "@/hooks/useUserInfo";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const { userId } = useAuth()

    // const loading = (status === "loading") && !userId;
    // if (loading) return null;

    if (!userId) return <Navigate to="/login" replace />;

    return <Outlet />
}

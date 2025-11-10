import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useUserInfo";

export default function RequireGuest() {
    const { userId } = useAuth()

    // const loading = (status === "loading");
    // if (loading) return null; 

    if (userId) return <Navigate to="/" replace />;

    return <Outlet />;
}

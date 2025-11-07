import AuthContext from "@/contexts/UserInfoContext";
import { useContext } from "react";

export default function useUserInfo() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx
};
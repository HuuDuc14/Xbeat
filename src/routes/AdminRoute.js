import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user/userContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { formUserInfo } = useContext(UserContext);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const tokenUser = localStorage.getItem("tokenUser");
        if (!tokenUser) {
            setIsChecking(false);
        } else {
            setIsChecking(true);
        }
    }, [formUserInfo]);

    if (!isChecking) {
        return <Navigate to="/not-found" />;
    }

    if (formUserInfo === null) {
        return <div>Loading...</div>; // Chờ dữ liệu cập nhật
    }

    if (formUserInfo && formUserInfo.role === 1) {
        return <Outlet />;
    }

    return <Navigate to="/not-found" />;
};

export default AdminRoute;

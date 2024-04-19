import { Outlet, Navigate } from "react-router-dom";

export const Protected = () => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/"/>;

};
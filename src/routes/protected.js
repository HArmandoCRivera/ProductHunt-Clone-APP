import { Outlet, Navigate } from "react-router-dom";

export const Protected = () => {
    const token = localStorage.getItem("data");

    return token ? <Outlet /> : <Navigate to="/"/>;

};
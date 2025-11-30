import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const token = localStorage.getItem("notes-app-token");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default PublicRoute;

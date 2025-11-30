import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token = localStorage.getItem("notes-app-token");
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;

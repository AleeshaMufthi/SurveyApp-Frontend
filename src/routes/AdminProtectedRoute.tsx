import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../redux/store";

const AdminProtectedRoute = () => {
    const admin = useSelector((state: RootState) => state.admin.admin);
    return admin ? <Outlet /> : <Navigate to="/admin/signin" replace />;
  };
  
  export default AdminProtectedRoute;
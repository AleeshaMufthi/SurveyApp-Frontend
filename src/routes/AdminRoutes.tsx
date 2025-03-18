import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminSignin from "../components/AdminSignin";

const AdminRoutes = () => (
    <Routes>
      <Route path="/signin" element={<AdminSignin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
  
  export default AdminRoutes;
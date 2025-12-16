import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import ProtectedRoute from "../components/admin/ProtectedRoute";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};

export default AdminPage;

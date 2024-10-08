import { Navigate, Outlet } from 'react-router-dom';
import AdminNavbar from 'components/AdminNavbar';
import UseAuth from 'hooks/UseAuth';

const AdminLayout = () => {
  const { auth } = UseAuth();
  const isAdminOrSuperAdmin = auth?.role_name === "admin" || auth?.role_name === "superadmin";

  if (!isAdminOrSuperAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <AdminNavbar />
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

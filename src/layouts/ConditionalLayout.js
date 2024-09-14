import { Outlet } from 'react-router-dom';
import AdminLayout from 'layouts/AdminLayout';
import MainLayout from 'layouts/MainLayout';
import UseAuth from 'hooks/UseAuth';

const ConditionalLayout = () => {
  const { auth } = UseAuth();

  const isAdminOrSuperAdmin = auth?.role_name === 'admin' || auth?.role_name === 'superadmin';

  if (isAdminOrSuperAdmin) {
    return <AdminLayout><Outlet /></AdminLayout>;
  } else {
    return <MainLayout><Outlet /></MainLayout>;
  }
};

export default ConditionalLayout;

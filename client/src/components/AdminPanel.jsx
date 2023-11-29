import { Routes, Route } from 'react-router-dom';
import { privateRoutes } from '../router';
import AdminLayout from './AdminLayout/AdminLayout';

const AdminPanel = () => {
  return (
    <AdminLayout links={privateRoutes}>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.element />}
            key={route.path}
          />
        ))}
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;

import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from '../routes/index';

const AdminContent = () => {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          Component={route.Component}
        ></Route>
      ))}
    </Routes>
  );
};

export default AdminContent;

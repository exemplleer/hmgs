import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import AdminLayout from './AdminLayout';

const AppRouter = () => {
  const isAuth = true;

  return (
    <Routes>
      {isAuth && (
        <Route Component={AdminLayout}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            ></Route>
          ))}
        </Route>
      )}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          Component={route.Component}
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRouter;

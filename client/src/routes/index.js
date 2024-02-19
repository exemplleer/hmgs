import { DASHBOARD_ROUTE, MAIN_ROUTE, ROOMS_ROUTE } from '../utils/consts';
import Dashboard from '../pages/admin/Dashboard';
import RoomsControl from '../pages/admin/RoomsControl';
import RoomCreate from '../pages/admin/RoomCreate';
import RoomInfo from '../pages/admin/RoomInfo';
import NotFound from '../pages/errors/NotFound';
import RoomEdit from '../pages/admin/RoomEdit';
import Home from '../pages/website/Home';

export const privateRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard,
  },
  {
    path: ROOMS_ROUTE,
    Component: RoomsControl,
  },
  {
    path: `${ROOMS_ROUTE}/create`,
    Component: RoomCreate,
  },
  {
    path: `${ROOMS_ROUTE}/:num`,
    Component: RoomInfo,
  },
  {
    path: `${ROOMS_ROUTE}/:num/edit`,
    Component: RoomEdit,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Home,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

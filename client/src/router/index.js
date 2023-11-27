import Dashboard from '../pages/Dashboard';
import Rooms from '../pages/Rooms';
import NotFound from '../pages/NotFound';

export const privateRoutes = [
  { path: '/', element: Dashboard, name: 'Dashboard' },
  { path: '/rooms', element: Rooms, name: 'Rooms' },
  { path: '*', element: NotFound },
];

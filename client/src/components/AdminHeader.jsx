import { useLocation, NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DASHBOARD_ROUTE, ROOMS_ROUTE } from '../utils/consts';
import isPathInclude from '../utils/isPathInclude';

const { Header } = Layout;

const navLinks = [
  {
    key: DASHBOARD_ROUTE,
    label: <NavLink to={DASHBOARD_ROUTE}>Статистика</NavLink>,
  },
  {
    key: ROOMS_ROUTE,
    label: <NavLink to={ROOMS_ROUTE}>Управление номерами</NavLink>,
  },
];

const AdminHeader = () => {
  const location = useLocation();
  const selectKey = (location) => {
    const pathname = location.pathname;
    switch (true) {
      case isPathInclude(pathname, 'rooms'):
        return ROOMS_ROUTE;
      default:
        return pathname;
    }
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        items={navLinks}
        defaultSelectedKeys={[selectKey(location)]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AdminHeader;

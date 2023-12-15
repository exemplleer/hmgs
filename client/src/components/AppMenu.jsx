import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import isLocationPathInclude from '../utils/isLocationPathInclude';
import { DASHBOARD_ROUTE, ROOMS_ROUTE } from '../utils/consts';

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

const AppMenu = ({ location }) => {
  const selectKey = (location) => {
    switch (true) {
      case isLocationPathInclude(location, 'rooms'):
        return ROOMS_ROUTE;
      default:
        return location.pathname;
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={navLinks}
      defaultSelectedKeys={[selectKey(location)]}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default AppMenu;

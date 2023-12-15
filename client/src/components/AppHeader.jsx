import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import AppMenu from './AppMenu';
const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <AppMenu location={location}></AppMenu>
    </Header>
  );
};

export default AppHeader;

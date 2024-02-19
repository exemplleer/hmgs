import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import AdminHeader from './AdminHeader';
const { Content } = Layout;

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminHeader />
      <Content style={{ padding: '16px 48px' }}>
        <div
          style={{
            minHeight: 600,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default AdminLayout;

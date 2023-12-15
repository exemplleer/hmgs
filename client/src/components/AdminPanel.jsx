import { Layout, theme } from 'antd';
import AppHeader from './AppHeader';
import AdminContent from './AdminContent';
const { Content } = Layout;

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ padding: '16px 48px' }}>
        <div
          style={{
            minHeight: 600,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AdminContent />
        </div>
      </Content>
    </Layout>
  );
};
export default AdminLayout;

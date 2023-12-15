import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  return <h2>{t('content.dashboard.title')}</h2>;
};

export default Dashboard;

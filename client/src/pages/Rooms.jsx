import { useTranslation } from 'react-i18next';

const Rooms = () => {
  const { t } = useTranslation();

  return <h1>{t('content.rooms.title')}</h1>;
};

export default Rooms;

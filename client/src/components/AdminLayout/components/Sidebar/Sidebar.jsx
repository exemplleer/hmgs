import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';

const Sidebar = ({ hide, children, isMobile = false, isActive = true }) => {
  const { t } = useTranslation();
  useEffect(() => {
    isMobile && isActive
      ? document.body.classList.add('scroll-disable')
      : document.body.classList.remove('scroll-disable');
  }, [isActive, isMobile]);

  return (
    <>
      <aside
        className={`sidebar${isActive ? '' : ' sidebar--hide'}${
          isMobile ? ' sidebar--mobile' : ''
        }`}
      >
        <nav className="sidebar__nav">{children}</nav>
        <button className="sidebar__btn-close" onClick={hide}>
          {t('sidebar.close')}
        </button>
      </aside>
      {isMobile && isActive && <div className="shade" onClick={hide} />}
    </>
  );
};

export default Sidebar;

import { useEffect } from 'react';
import './styles.css';

const Sidebar = ({ hide, children, isMobile = false, isActive = true }) => {
  useEffect(() => {
    isMobile && isActive
      ? document.body.classList.add('shade')
      : document.body.classList.remove('shade');
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
          Закрыть
        </button>
      </aside>
      {isMobile && isActive && <div className="shade" onClick={hide} />}
    </>
  );
};

export default Sidebar;

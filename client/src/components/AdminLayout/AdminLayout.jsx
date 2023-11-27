import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoMdMenu } from 'react-icons/io';
import Sidebar from '../UI/Sidebar/Sidebar';
import './styles.css';

function AdminLayout({ children, links = [] }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isSidebarActive, setisSidebarActive] = useState(!isMobile);

  const sidebarToggle = () => setisSidebarActive(!isSidebarActive);

  useEffect(() => {
    isMobile ? setisSidebarActive(false) : setisSidebarActive(true);
  }, [isMobile]);

  return (
    <div className="page-container">
      <div
        id="content"
        className={`content${
          isMobile ? ' content--mobile' : ' content--shift'
        }`}
      >
        <header className="header">
          <button className="sidebar-toggle" onClick={sidebarToggle}>
            <IoMdMenu
              style={{ width: '100%', height: '100%', color: '#fff' }}
            />
          </button>
          <h1 className="header__title">Админ-панель</h1>
        </header>
        <div className="content__wrapper">
          <main className="content__container">{children}</main>
        </div>
      </div>

      <Sidebar
        isMobile={isMobile}
        isActive={isSidebarActive}
        hide={sidebarToggle}
        links={links}
      />
    </div>
  );
}

export default AdminLayout;

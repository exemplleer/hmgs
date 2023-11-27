import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const Sidebar = ({ hide, links = [], isMobile = false, isActive = true }) => {
  useEffect(() => {
    isMobile && isActive
      ? document.body.classList.add('fading')
      : document.body.classList.remove('fading');
  }, [isActive, isMobile]);

  return (
    <>
      <aside
        className={`sidebar${isActive ? '' : ' sidebar--hide'}${
          isMobile ? ' sidebar--mobile' : ''
        }`}
      >
        <nav className="sidebar__nav">
          {links.map((link) => {
            if (!link.name) {
              return;
            }
            return (
              <NavLink
                to={link.path}
                key={link.path}
                className="sidebar__nav-link"
                onClick={isMobile ? hide : null}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>
        <button className="sidebar__btn-close" onClick={hide}>
          Закрыть
        </button>
      </aside>
      {isMobile && isActive && <div className="fading" onClick={hide} />}
    </>
  );
};

export default Sidebar;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faPaw } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../public/images/logo/nav_logo.png';
import HeaderButtons from './HeaderButtons';
import useAccount from '../hooks/useAccount';

function Header() {
  const {
    isClient, isVeto, isAdmin, getUser,
  } = useAccount();

  const { pathname } = useLocation();

  const user = getUser();

  const getLinkCssAsPath = (link) => {
    if (pathname === link) {
      return 'link-success';
    }
    return 'link-dark';
  };

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 border-bottom">
      <NavLink to="/" className="d-flex align-items-center col-md-2 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src={Logo} width="40" alt="logo" />
        Take'A'Vet
        {isVeto() && ' - Vétérinaire'}
        {(isClient() && !isAdmin()) && ` - Bienvenue ${user.firstName} ${user.lastName}`}
      </NavLink>
      <div className="d-flex flex-row collapse flex-wrap m-lg-2">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center align-items-center mb-md-0">
          <li>
            <NavLink to="/" className={`nav-link px-2 ${getLinkCssAsPath('/')}`}>Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/planning" className={`nav-link px-2 ${getLinkCssAsPath('/planning')}`}>Planning</NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={`nav-link px-2 ${getLinkCssAsPath('/faq')}`}>Foire aux questions</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={`nav-link px-2 ${getLinkCssAsPath('/contact')}`}>Nous contacter</NavLink>
          </li>
          {(isVeto() || isClient()) && (
          <li>
            |
          </li>
          )}
          {isClient() && (
          <>
            <li>
              <NavLink to="/my/adresses" className="nav-link px-2 link-dark">
                <FontAwesomeIcon icon={faHome} />
                {' '}
                Mes adresses
              </NavLink>
            </li>
            <li>
              <NavLink to="/animals" className="nav-link px-2 link-dark">
                <FontAwesomeIcon icon={faPaw} />
                {' '}
                Mes animaux
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointments/" className="nav-link px-2 link-dark">
                <FontAwesomeIcon icon={faCalendar} />
                {' '}
                Mes rendez-vous
              </NavLink>
            </li>
          </>
          )}
        </ul>

        <HeaderButtons />

      </div>
    </header>
  );
}

export default Header;

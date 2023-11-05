import { NavLink } from 'react-router-dom';
import React from 'react';
import {
  adminUrl, avatarUrl, loginUrl, logoutUrl, registerUrl,
} from '../api/TakeAVetClient';
import useAccount from '../hooks/useAccount';

export default function HeaderButtons() {
  const {
    isLoading, isVeto, isAdmin, isFullyLoggedIn, getUser,
  } = useAccount();

  const user = getUser();

  const defaultButtons = (
    <>
      <a href={registerUrl()} className="btn btn-outline-primary me-2">S'inscrire</a>
      <a href={loginUrl()} className="btn btn-primary">Se connecter</a>
    </>
  );

  const divClass = 'd-flex align-items-center flex-grow-1 justify-content-evenly gap-3 mx-3';

  return (
    isLoading ? (
      <div className={divClass}>
        {defaultButtons}
      </div>
    )
      : (
        <div className={divClass}>
          {isVeto() && (
          <NavLink to="/dashboard" className="btn btn-primary">
            <i className="fa-solid fa-paw" />
            {' '}
            Mon
            Dashboard
          </NavLink>
          )}

          {isAdmin() && (
          <a href={adminUrl()} target="_blank" className="btn btn-danger me-2" rel="noreferrer">
            <i className="fa-solid fa-sliders" />
            {' '}
            Menu Admin
          </a>
          )}

          {isFullyLoggedIn() && <a href={logoutUrl()} className="btn btn-outline-danger me-2">Déconnexion</a>}

          {!isFullyLoggedIn() && defaultButtons}

          <NavLink to="/me">
            {isFullyLoggedIn()
          && (
            <img
              src={avatarUrl(user.id)}
              alt="avatar"
              height="45"
              className="rounded-circle"
              loading="lazy"
            />
          ) }
          </NavLink>

        </div>
      )
  );
}

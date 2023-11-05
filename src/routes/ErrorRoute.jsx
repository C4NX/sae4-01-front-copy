// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate, useRouteError } from 'react-router-dom';
import React from 'react';

import CatSvg from '../../public/images/logo/cat.svg';
import { loginUrl } from '../api/TakeAVetClient';

export default function ErrorRoute() {
  const error = useRouteError();
  const navigate = useNavigate();

  window.lastError = error;

  // handle redirect to log in if 401 (unauthorized)
  if (error.code === 401) {
    // eslint-disable-next-line no-console
    console.warn('401 error, redirecting to login page');
    window.location.href = loginUrl();
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <div id="error-page" className="text-center h-100">
      <h1>Miaou~ !</h1>
      <img src={CatSvg} alt="Le chat de takeavet" width={100} height={100} />
      <p>Désolé, une erreur est survenue.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="d-flex gap-2 justify-content-center">
        <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>Retourner à la page précédente</button>
        <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/')}>Retourner vers l&apos;accueil</button>
      </div>
    </div>
  );
}

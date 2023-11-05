/* eslint-disable jsx-a11y/label-has-associated-control,import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Logo from '../../public/images/logo/nav_logo.png';
import { subscribeToNewsletter } from '../api/TakeAVetClient';

export default function Footer() {
  const [hasNewsletterSubscribe, setHasNewsletterSubscribe] = useState(false);

  const onSubmit = async (event) => {
    if (!hasNewsletterSubscribe) {
      event.preventDefault();
      const emailElement = document.getElementById('newsletter1');
      await subscribeToNewsletter(emailElement.value);
      emailElement.value = `Bienvenue ${emailElement.value}!`;
      setHasNewsletterSubscribe(true);
    }
  };

  return (
    <footer className="p-4 border-top">
      <div className="row align-content-center">
        <div className="col-md-5 footer-left-block">
          <a href="/" className="nav-link">
            <img src={Logo} width="40" alt="Logo de take a vet" />
            Take’A’Vet
          </a>
          <p className="text-secondary">Take’A’Vet est une application de gestion de rendez-vous pour vétérinaire.</p>
        </div>

        <div className="col-md-5 offset-md-1 mb-3">
          <form>
            <h5>S'inscrire à la newsletter</h5>
            <p>Un condensé mensuel de nos nouveautés !</p>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
              <label htmlFor="newsletter1" className="visually-hidden">Adresse email</label>
              <input id="newsletter1" type="email" className="form-control" placeholder="Adresse email" disabled={hasNewsletterSubscribe} />
              <button className="btn btn-primary" type="button" onClick={onSubmit} disabled={hasNewsletterSubscribe}>S'inscrire</button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center py-4 my-4 border-top">
        <p>&copy; Copyright, All Rights Reserved by Take’A’Vet and SPLUG Software.</p>
      </div>
    </footer>
  );
}

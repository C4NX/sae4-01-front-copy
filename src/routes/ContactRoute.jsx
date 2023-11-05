import React from 'react';
import { NavLink } from 'react-router-dom';
import BasePage from '../components/BasePage';

export default function ContactRoute() {
  const onMailClick = () => {
    const sujectValue = document.getElementById('subject')?.value;
    const messageValue = document.getElementById('message')?.value;

    if (typeof sujectValue === 'string' && typeof messageValue === 'string') {
      const aElmt = document.createElement('A');
      aElmt.setAttribute('target', '_blank');
      aElmt.href = `mailto: contact@takea.vet?subject=${sujectValue}&body=${messageValue}`;
      aElmt.click();
    }
  };

  return (
    <BasePage title="Nous contacter">
      <div className="main-content__home">
        <div className="contact_networks_icones">
          <div className="contact_main">
            <div className="contact_contacting">
              <form>
                <div>
                  <div className="main-title">
                    <h3>Nous contacter</h3>
                    <p>
                      Merci de nous envoyer un mail a cette adresse
                      <a
                        href="mailto: contact@takea.vet"
                      >
                        contact@takea.vet
                      </a>
                      , si vous avez des
                      questions ou des problèmes sur le service.
                    </p>
                  </div>
                  <div className="form">
                    <div className="form-group">
                      <label htmlFor="subject">Sujet (*)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Sujet : Salut Take'A'Vet !"
                      />
                      <small id="indication" className="form-text text-muted">
                        (*) Les champs marqués
                        d'une étoile sont obligatoires.
                      </small>
                      <textarea
                        type="text"
                        className="form-control"
                        id="message"
                        placeholder="Votre message..."
                      />
                      <button
                        type="button"
                        className="btn btn-primary button_form"
                        id="btn_contact"
                        onClick={onMailClick}
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="networks_icones">
            <h5 className="title_form">Réseaux sociaux</h5>
            <div className="networks_icones__icones">
              <a href="https://www.facebook.com/takeavet/" target="_blank" rel="noreferrer">
                <i
                  className="fab fa-facebook-square"
                />
              </a>
              <a href="https://www.instagram.com/takeavet/" target="_blank" rel="noreferrer">
                <i
                  className="fab fa-instagram"
                />
              </a>
              <a href="https://twitter.com/takeavet" target="_blank" rel="noreferrer"><i className="fab fa-twitter-square" /></a>
            </div>
          </div>
        </div>
        <div className="networks_main">
          <h5>Où nous trouver?</h5>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.10167310515!2d4.03153917619462!3d49.2555187726778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e975ad3ce7cfd1%3A0x6e49dffffc187bf8!2sPlace%20Royale!5e0!3m2!1sfr!2sfr!4v1672841099021!5m2!1sfr!2sfr"
            width="300"
            height="250"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="line_under_iframe" />
          <div className="address_takeavet">
            <p style={{ fontWeight: 'bold' }}>Take'A'Vet</p>
            <p>Groupe Vétérinaire Take'A'Vet</p>
            <p>
              <i style={{ color: 'gray' }}>
                8 Allée de la Pacific
                <br />
                Numéro 58
                <br />
                Code postal : 51000
              </i>
            </p>
          </div>
        </div>
      </div>
    </BasePage>
  );
}

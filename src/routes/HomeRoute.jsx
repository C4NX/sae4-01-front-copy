/* eslint-disable max-len */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Timeline } from 'react-twitter-widgets';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  faCat, faClipboardQuestion, faQuestion, faWandMagic, faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import BasePage from '../components/BasePage';
import SocialShares from '../components/Utils/SocialShares';

import Cat1 from '../../public/images/ours-cats/chat_1.jpg';
import Cat2 from '../../public/images/ours-cats/chat_2.jpg';
import Cat3 from '../../public/images/ours-cats/chat_3.jpg';
// import Cat4 from '../../public/images/ours-cats/chat_4.jpg'; // 🚙
import Cat5 from '../../public/images/ours-cats/chat_5.jpg';
import BootstrapSlideshow from '../components/Utils/BootstrapSlideshow';

export default function HomeRoute(props) {
  const { twitterUsername } = props;

  return (
    <BasePage columnResponsive>
      <section className="main-section">
        <h1 className="main-content__title">
          Bienvenue sur
          {' '}
          <span>Take'A'Vet</span>
        </h1>
        <span className="text-center">
          Le site qui vous permet de prendre rendez-vous avec votre vétérinaire, de poser des questions et de gérer la santé de vos animaux de compagnie.
        </span>
        <div className="container">
          <BootstrapSlideshow
            slides={[
              {
                src: Cat1,
                alt: 'Le chat le plus heureux du monde',
                title: 'Prendre des rendez-vous, simplement et a domicile !',
                icon: faWandMagicSparkles,
                text: 'Prendre des rendez-vous n\'a jamais été aussi simple et facile. Plus besoin de perdre votre temps en téléphonant aux secrétariats ou en vous déplaçant physiquement jusqu\'à un cabinet médical. Avec notre service, vous pouvez fixer un rendez-vous depuis le confort de votre domicile, à n\'importe quel moment de la journée.',
              },
              {
                src: Cat2,
                title: 'Poser vos questions !',
                alt: 'Le chat le plus heureux du monde',
                icon: faQuestion,
                text: 'Les vétérinaires et les utilisateurs de Take\'A\'Vet se feront un plaisir de vous répondre.',
              },
              {
                src: Cat3,
                alt: 'Le chat le plus heureux du monde',
                title: 'Gérer la santé de vos animaux de compagnie !',
                icon: faClipboardQuestion,
                text: 'Gérer la santé de vos animaux de compagnie n\'a jamais été aussi simple. Vous pouvez désormais suivre les vaccinations, les rendez-vous médicaux et les traitements de vos animaux depuis chez vous, en quelques clics seulement.',
              },
              {
                src: Cat5,
                alt: 'Le chat le plus heureux du monde',
                title: 'Ce chat utilise Take\'A\'Vet !',
                icon: faCat,
                iconSide: 'right',
                text: 'Regardez comment il est heureux, il a pris rendez-vous avec son vétérinaire préféré ! 🐱',
              },
            ]}
            autoplay
          />
        </div>
        <hr className="py-2" />
        <figure className="p-3 m-1" style={{ border: '1px solid', borderRadius: '5px' }}>
          <p>
            Chers amis animaliers,
          </p>
          <p>
            Nous sommes heureux de vous accueillir sur notre site de prise de rendez-vous vétérinaire. Nous
            comprenons à quel point il est important de prendre soin de la santé de vos animaux de
            compagnie, car nous sommes également des amoureux des animaux.
            Chez nous, la vocation de prendre soin des animaux est plus qu'un simple métier, c'est notre
            passion. Nous avons tous des animaux chez nous et comprenons à quel point il est important de
            les choyer et de les aimer. C'est pour cela que nous nous engageons à vous offrir les meilleurs
            soins pour vos animaux, tout en étant à l'écoute de vos besoins.
            Notre objectif est de vous faciliter la prise de rendez-vous et de vous offrir un service de
            qualité pour la santé de vos animaux. Grâce à notre plateforme en ligne, vous pouvez planifier
            des rendez-vous à n'importe quel moment, consulter les disponibilités des professionnels de
            santé animal et suivre l'historique de santé de vos animaux.
            Nous sommes impatients de vous aider à prendre soin de vos animaux de compagnie et sommes à
            votre disposition pour toute question ou préoccupation.
          </p>
          <figcaption className="blockquote-footer">
            L'Equipe de
            {' '}
            <cite title="Service de vétérinaire en ligne Take'A'Vet">Take'A'Vet</cite>
          </figcaption>
        </figure>
      </section>
      <aside className="twitter-container">
        <div className="main_buttons__list">
          <NavLink to="/test" className="btn btn-outline-success">
            Prendre un rendez-vous !
            {' '}
            <i
              className="fa-solid fa-house"
            />
          </NavLink>
          <NavLink to="/faq/thread" className="btn btn-outline-success">
            Poser une
            question
            {' '}
            <i className="fa-solid fa-question" />
          </NavLink>
          <NavLink to="/planning" className="btn btn-outline-success">
            Consulter le
            planning des vétérinaires
            {' '}
            <i className="fa-solid fa-calendar-days" />
          </NavLink>
        </div>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: twitterUsername,
          }}
          options={{
            height: '1200',
          }}
        />
        <SocialShares />
      </aside>
    </BasePage>
  );
}

HomeRoute.propTypes = {
  twitterUsername: PropTypes.string,
};

HomeRoute.defaultProps = {
  twitterUsername: 'TwitterDev',
};

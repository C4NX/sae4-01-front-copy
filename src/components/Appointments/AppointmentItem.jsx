import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';
import { useLocation } from 'react-router-dom';

export default function AppointmentItem(props) {
  const { appointment, isVetView, children } = props;
  const { hash } = useLocation();

  useEffect(() => {
    if (hash.includes('#ap-')) {
      const id = hash.replace('#ap-', '');
      if (id === appointment.id) {
        const element = document.getElementById(hash.replace('#', ''));
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [appointment]);

  return (
    <div className="appointment__item" id={`ap-${appointment.id}`}>
      <div className="d-flex gap-2 m-2">
        {appointment.isUrgent && <span className="badge text-bg-warning">Urgent</span>}
        {appointment.isValidated
          ? <span className="badge text-bg-success">Rendre-vous validé, le vétérinaire vous attendera à l'heure indiquée</span>
          : <span className="badge text-bg-info">En attente de validation</span>}
        {appointment.isCompleted && <span className="badge text-bg-success">Terminé</span>}
      </div>
      <h4>
        Rendez-vous du
        {' '}
        <span className="text-primary">
          {formatDate(appointment.date, {
            year: 'numeric', month: 'long', day: 'numeric', locale: 'fr',
          })}
        </span>
        {' '}
        de
        {' '}
        <span className="text-primary">
          {formatDate(appointment.startHour, { hour: 'numeric', minute: 'numeric', locale: 'fr' })}
        </span>
        {' '}
        à
        {' '}
        <span className="text-primary">
          {formatDate(appointment.endHour, { hour: 'numeric', minute: 'numeric', locale: 'fr' })}
        </span>
      </h4>
      <p>
        Note:
      </p>
      <p>
        <textarea className="form-control" readOnly value={appointment.note === '' ? '(Pas de note)' : appointment.note} />
      </p>
      {!isVetView && (
        <>
          <p>Bonjour, 🐈</p>
          <p>
            Vous avez pris rendez-vous pour une consultation avec notre
            vétérinaire expérimenté, le
            {' '}
            <strong>
              Dr
              {' '}
              {appointment.veto.firstName}
              {' '}
              {appointment.veto.lastName}
            </strong>
            . Le rendez-vous a été pris pour
            {' '}
            <strong>
              {appointment.type.duration }
              {' '}
              minutes
            </strong>
            {' '}
            (
            <strong>{appointment.type.name}</strong>
            )
            {' '}
            et se déroulera à l'addresse suivante,
            {appointment.location
              ? (
                <>
                  <strong>
                    {' '}
                    {appointment.location.ad}
                    ,
                    {' '}
                    {appointment.location.city}
                    ,
                    {' '}
                    {appointment.location.pc}
                  </strong>
                  , afin de permettre à votre animal de recevoir les soins nécessaires dans un environnement
                  familier. Notre vétérinaire se déplacera jusqu'à cette addresse avec tout le matériel
                  nécessaire pour procéder à l'examen de votre.vos animal.aux et lui prodiguer les soins
                  appropriés. N'hésitez pas à nous contacter si vous avez des
                  questions ou des préoccupations avant le rendez-vous.
                </>
              ) : (
                <>
                  {' '}
                  <strong>(Pas d'adresse spécifiée)</strong>
                  {' '}
                  , afin de permettre à votre animal de recevoir les soins nécessaires.
                  Le vétérinaire
                  {' '}
                  <strong>vous contactera pour convenir de l'heure et de l'endroit</strong>
                  {' '}
                  du rendez-vous.
                  Cela peut être à votre domicile ou dans une clinique vétérinaire.
                </>
              )}
          </p>
          {appointment.veto.phone && (
            <p>
              Pour toute question, vous pouvez le contacter au numéro suivant:
              {' '}
              <strong>{appointment.veto.phone}</strong>
            </p>
          )}
        </>
      )}

      {isVetView && (
        <>
          <p>
            Type de rendez-vous demandé:
            {' '}
            <strong>{appointment.type.name}</strong>
            {' '}
            (durée:
            {' ~'}
            {appointment.type.duration}
            {' '}
            minutes)
          </p>
          <p>
            Pour:
            {' '}
            <strong>{appointment.client.firstName}</strong>
            {' '}
            <strong>{appointment.client.lastName}</strong>
          </p>
          <p>
            Avec comme animal:
            {' '}
            <strong>{appointment.animal.name}</strong>
            {' ('}
            <strong>{appointment.animal.type.name}</strong>
            )
          </p>
        </>
      )}
      {children}
    </div>
  );
}

AppointmentItem.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    startHour: PropTypes.string.isRequired,
    endHour: PropTypes.string.isRequired,
    type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    animal: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      ad: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      pc: PropTypes.string.isRequired,
    }),
    note: PropTypes.string.isRequired,
    veto: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isUrgent: PropTypes.bool.isRequired,
    isValidated: PropTypes.bool.isRequired,
  }).isRequired,
  isVetView: PropTypes.bool,
};

AppointmentItem.defaultProps = {
  isVetView: false,
};

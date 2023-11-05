/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatRange } from '@fullcalendar/core';
import Loading from '../Loading';
import AddressCard from './AddressCard';
import AnimalCard from './AnimalCard';
import AnimalSlideshow from '../Animals/AnimalSlideshow';

export default function AppointmentBanner(props) {
  const {
    appointment, animal, address, className,
  } = props;

  const hasAppointment = () => appointment && appointment.data;
  const hasAnimal = () => animal && animal.data;
  const hasAddress = () => address && address.data;

  return (
    <div className={className}>
      <div className="d-flex align-items-baseline gap-2 justify-content-center col-row-responsive">
        {(!hasAppointment())
          ? <p>Vous n'avez pas de rendez-vous pour le moment.</p>
          : (
            <>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Rendez-vous (
                    {formatDate(appointment.member.date)}
                    {' '}
                    de
                    {' '}
                    {formatRange(appointment.member.startHour, appointment.member.endHour, { hour: 'numeric', minute: '2-digit', locale: 'fr' })}
                    )
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Note du client :
                  </h6>
                  <textarea className="form-control" value={appointment.member.note} />
                  <div className="my-3 d-flex justify-content-around gap-3">
                    <a href="#" className="btn btn-outline-success">Modifier la note</a>
                    <a href="#" className="btn btn-outline-secondary">Écrire un rapport</a>
                    <a href="#" className="btn btn-outline-primary">Valider le rendez-vous</a>
                  </div>
                </div>
              </div>
              {
              !hasAnimal() ? <Loading text="Chargement de l'animal..." centered />
                : (
                  <AnimalCard animal={animal} />
                )
            }
              {
              !hasAddress() ? <Loading text="Chargement de l'adresse..." centered />
                : (
                  <AddressCard address={address} />
                )
            }
            </>
          )}
      </div>
    </div>
  );
}

AppointmentBanner.propTypes = {
  appointment: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
  }),
  animal: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
  }),
  address: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
  }),
  className: PropTypes.string,
};

AppointmentBanner.defaultProps = {
  appointment: null,
  animal: null,
  address: null,
  className: '',
};

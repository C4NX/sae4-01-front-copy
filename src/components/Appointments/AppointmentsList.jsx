import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useAccount from '../../hooks/useAccount';
import { getMyAppointments } from '../../api/TakeAVetClient';
import AppointmentItem from './AppointmentItem';
import Loading from '../Loading';

export default function AppointmentsList({ edit }) {
  const { isNotLoggedIn, isFullyLoggedIn } = useAccount();
  const [appointmentsDataList, setAppointmentsDataList] = useState(undefined);

  useEffect(() => {
    if (appointmentsDataList === null) {
      getMyAppointments().then((appointments) => {
        console.log('[AppointmentsList] appointments: ', appointments);
        setAppointmentsDataList(appointments.member);
      });
    }
  }, [appointmentsDataList]);

  useEffect(() => {
    setAppointmentsDataList(null);
  }, [isFullyLoggedIn()]);

  return (
    <div>
      {edit && (
      <div className="d-flex justify-content-end">
        <NavLink className="btn btn-success mb-4" to="/appointments/new">
          <FontAwesomeIcon icon={faPlus} />
          {' '}
          Prendre un rendez-vous
        </NavLink>
        <button
          type="button"
          className="btn btn-secondary mb-4 ms-2"
          onClick={() => {
            setAppointmentsDataList(null);
          }}
        >
          <FontAwesomeIcon icon={faSync} />
          {' '}
          Recharger la liste
        </button>
      </div>
      )}
      {!appointmentsDataList && <Loading centered />}
      {isNotLoggedIn && <p className="text-center">Vous devez être connecté pour accéder à cette page !</p>}
      {appointmentsDataList && (
      <div className="appointment__list">
        {appointmentsDataList.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </div>
      )}
    </div>
  );
}

AppointmentsList.propTypes = {
  edit: PropTypes.bool,
};

AppointmentsList.defaultProps = {
  edit: false,
};

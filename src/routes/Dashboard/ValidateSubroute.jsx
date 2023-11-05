import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSync } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading';
import { getMyAppointments, patchAppointment } from '../../api/TakeAVetClient';
import AppointmentItem from '../../components/Appointments/AppointmentItem';

export default function ValidateSubroute() {
  const [appointments, setAppointments] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    getMyAppointments().then((resp) => {
      console.log('[Validate] Appointments:', resp);
      setAppointments(resp);
    });
  }, [appointments === undefined]);

  const handleValidate = (appointmentId) => {
    console.log('[Validate] Appointment ID:', appointmentId);
    patchAppointment(appointmentId, { isValidated: true })
      .then(() => {
        setAppointments(undefined);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between gap-2 mb-4">
        <button type="button" className="btn btn-secondary" onClick={() => setAppointments(undefined)}>
          <FontAwesomeIcon icon={faSync} />
          {' '}
          Rafraichir
        </button>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          {' '}
          Retour au dashboard
        </button>
      </div>
      {appointments === undefined ? <Loading text="Chargement des rendez-vous..." centered /> : (
        <div>
          {appointments.member.map((appointment) => (
            <div key={appointment.id}>
              <p>
                <AppointmentItem appointment={appointment} isVetView>
                  <button type="button" className="btn btn-success" onClick={() => handleValidate(appointment.id)}>Valider</button>
                </AppointmentItem>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

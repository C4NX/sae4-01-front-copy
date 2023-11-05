import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AgendaSelector from '../Agenda/AgendaSelector';
import TypeAppointmentSelector from '../TypeAppointment/TypeAppointmentSelector';
import AnimalSelector from '../Animals/AnimalSelector';
import { takeAppointment } from '../../api/TakeAVetClient';

function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

export default function AppointmentForm() {
  const [vetId, setVetId] = useState(undefined);
  const [note, setNote] = useState('');
  const [requestTimezone, setRequestTimezone] = useState('Europe/Paris');
  const navigate = useNavigate();

  const [appointmentType, setAppointmentType] = useState({
    id: undefined,
    name: undefined,
    description: 'Veuillez sélectionner un type de rendez-vous',
    duration: 30,
  });
  const [animal, setAnimal] = useState(undefined);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`[AppointmentForm] VetId: ${vetId}, appointmentType: ${appointmentType.id}, appointmentDate: ${appointmentDate} animal: ${animal.id}`);

    const dateAndTime = convertTZ(appointmentDate, requestTimezone);
    console.log(`[AppointmentForm] Date and time: ${dateAndTime} in ${requestTimezone}`);

    takeAppointment({
      note,
      isUrgent: false,
      type: `/api/type_appointments/${appointmentType.id}`,
      veto: `/api/users/${vetId}`,
      animal: `/api/animals/${animal.id}`,
      date: dateAndTime.toJSON(),
      startHour: dateAndTime.toJSON(),
      location: '/api/addresses/1',
    })
      .then((response) => {
        console.log('[AppointmentForm] Appointment created: ', response);
        navigate(`/appointments#ap-${response.member.id}`);
      })
      .catch((error) => {
        console.error('[AppointmentForm] Error: ', error);
      });
  };

  return (
    <div>
      <p> Pour prendre rendez-vous, veuillez remplir le formulaire ci-dessous. </p>
      <div>
        <div className="form-group d-flex flex-column gap-2">
          <div className="d-flex gap-2">
            <label htmlFor="appointmentType" className="flex-grow-1 d-flex flex-column gap-2">
              Type de rendez-vous
              <TypeAppointmentSelector
                triggerFirst
                onSelect={(data) => {
                  console.log('[AppointmentForm] AppointmentType selected: ', data);
                  setAppointmentType(data);
                }}
              />
              <p className="border border-1 p-4">
                <small>{appointmentType.description}</small>
              </p>
              <label htmlFor="animal">
                Animal
                <AnimalSelector
                  triggerFirst
                  onSelect={(data) => {
                    console.log('[AppointmentForm] Animal selected: ', data);
                    setAnimal(data);
                  }}
                />
              </label>
            </label>
            <label htmlFor="appointmentNote" className="flex-grow-1 d-flex flex-column">
              Note concernant le rendez-vous (optionnel)
              <textarea className="form-control flex-grow-1" id="appointmentNote" placeholder="Note concernant le rendez-vous, exemple: 'Mon chien a des problèmes de digestion'." onChange={(e) => setNote(e.target.value)} value={note} />
            </label>
          </div>
          <div className="p-4 border border-1">
            <AgendaSelector
              onVetoChange={(id) => {
                console.log('[AppointmentForm] Vet changed: ', id);
                setVetId(id);
              }}
              defaultVet={vetId}
              editModeEventDuration={+appointmentType.duration}
              onEditDateChanged={(date, timezone) => {
                console.log('[AppointmentForm] Date changed: ', date, timezone);
                setAppointmentDate(date);
                setRequestTimezone(timezone);
              }}
              editMode
              disableTitle
              firstTrigger
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Prendre rendez-vous
              {' '}
              <FontAwesomeIcon icon={faCalendarCheck} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

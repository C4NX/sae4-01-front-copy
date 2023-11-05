import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faList, faPager, faPaperclip, faPen,
} from '@fortawesome/free-solid-svg-icons';
import { getAddress, getAnimal, getAppointmentsThisHour } from '../api/TakeAVetClient';
import AppointmentBanner from '../components/Dashboard/AppointmentBanner';
import Loading from '../components/Loading';
import getIdFromHydraUrl from '../services/transformers/getIdFromHydraUrl';

export default function DashboardRoute() {
  const [hourAppointment, setHourAppointment] = useState(undefined);
  const [animal, setAnimal] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  useEffect(() => {
    getAppointmentsThisHour().then((appResp) => {
      console.log('[Dashboard] Current Appointment:', appResp);

      if (appResp.data !== null) {
        getAnimal(appResp.member.animal.id).then((animalResp) => {
          console.log('[Dashboard] Animal:', animalResp);
          setAnimal(animalResp);
        });
        getAddress(getIdFromHydraUrl(appResp.member.location)).then((addressResp) => {
          console.log('[Dashboard] Address:', addressResp);
          setAddress(addressResp);
        });
        setHourAppointment(appResp);
      } else {
        console.log('[Dashboard] No appointment this hour.');
        setHourAppointment(null);
      }
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center my-3 gap-3">
        <NavLink to="/dashboard/editor" className="btn btn-primary">
          <FontAwesomeIcon icon={faPen} />
          {' '}
          Modifier mon agenda
        </NavLink>
        <NavLink to="/dashboard/validate" className="btn btn-primary">
          <FontAwesomeIcon icon={faList} />
          {' '}
          Voir mes rendez-vous
        </NavLink>
        <NavLink to="/" className="btn btn-primary">
          <FontAwesomeIcon icon={faCalendar} />
          {' '}
          Voir mon planning
        </NavLink>
      </div>
      {hourAppointment === undefined ? <Loading text="Chargement du rendez-vous de cette heure..." centered /> : <AppointmentBanner appointment={hourAppointment} animal={animal} address={address} />}
    </div>
  );
}

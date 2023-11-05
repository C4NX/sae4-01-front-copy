// noinspection JSCheckFunctionSignatures

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllAnimalAsClient } from '../../api/TakeAVetClient';
import useAccount from '../../hooks/useAccount';
import Loading from '../Loading';
import getGenderString from '../../services/transformers/getGenderString';

export default function TypeAppointmentSelector(props) {
  const { onSelect, triggerFirst } = props;

  const [animals, setAnimal] = useState([]);

  const { isFullyLoggedIn, isLoading } = useAccount();

  useEffect(
    () => {
      if (isFullyLoggedIn()) {
        getAllAnimalAsClient().then((data) => {
          setAnimal(data.member);
          if (triggerFirst) {
            onSelect(data.member[0]);
          }
        });
      }
    },
    [isFullyLoggedIn()],
  );

  return (
    isLoading
      ? <Loading />
      : (
        <select
          className="form-control"
          name="type"
          id="type"
          onChange={(e) => {
          // search the appointment type in the list with the id
            const appointmentType = animals.find((type) => type.id === +e.target.value);
            onSelect(appointmentType);
          }}
        >
          {animals.map((appointmentType) => (
            <option key={appointmentType.id} value={appointmentType.id}>
              {appointmentType.name}
              {' '}
              {appointmentType.gender !== 'N' && `(${getGenderString(appointmentType.gender)})`}
              {' '}
              -
              {' '}
              {appointmentType.type.name}
            </option>
          ))}
        </select>
      )
  );
}

TypeAppointmentSelector.propTypes = {
  // Function called when the user select a type of appointment
  onSelect: PropTypes.func,
  // If true, the first type of appointment is selected by default
  triggerFirst: PropTypes.bool,
};

TypeAppointmentSelector.defaultProps = {
  onSelect: () => { },
  triggerFirst: true,
};

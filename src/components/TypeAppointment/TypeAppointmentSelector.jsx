// noinspection JSCheckFunctionSignatures

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllAppointmentTypes } from '../../api/TakeAVetClient';

export default function TypeAppointmentSelector(props) {
  const { onSelect, triggerFirst } = props;

  const [appointmentTypes, setAppointmentTypes] = useState([]);

  useEffect(
    () => {
      getAllAppointmentTypes().then((data) => {
        setAppointmentTypes(data.member);
        if (triggerFirst) {
          onSelect(data.member[0]);
        }
      });
    },
    [],
  );

  return (
    <select
      className="form-control"
      name="type"
      id="type"
      onChange={(e) => {
        // search the appointment type in the list with the id
        const appointmentType = appointmentTypes.find((type) => type.id === +e.target.value);
        onSelect(appointmentType);
      }}
    >
      {appointmentTypes.map((appointmentType) => (
        <option key={appointmentType.id} value={appointmentType.id}>
          {appointmentType.name}
          (
          ~
          {appointmentType.duration}
          {' '}
          minutes
          )
        </option>
      ))}
    </select>
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

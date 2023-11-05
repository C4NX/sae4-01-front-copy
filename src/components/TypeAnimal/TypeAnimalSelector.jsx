import React, { useEffect, useState } from 'react';
import { getAllTypeAnimal } from '../../api/TakeAVetClient';
import PropTypes from 'prop-types';

export default function TypeAnimalSelector(props) {
  const { onSelect, triggerFirst } = props;
  const [typeAnimal, setTypeAnimal] = useState(undefined);
  useEffect(() => {
    getAllTypeAnimal().then((x) => {
      setTypeAnimal(x.data['hydra:member']);
      if (triggerFirst) {
        onSelect(x.member[0]);
      }
    });
  }, []);
  return (
    <select
      className="form"
      id="type"
      onChange={(e) => {
        // search the appointment type in the list with the id
        const animalType = typeAnimal.find((type) => type.id === +e.target.value);
        onSelect(animalType);
      }}
    >
      {typeAnimal !== undefined && typeAnimal.map((x) => (
        <option value={x.id} key={x.id}>{x.name}</option>
      ))}
    </select>
  );
}
TypeAnimalSelector.propTypes = {
  // Function called when the user select a type of appointment
  onSelect: PropTypes.func,
  // If true, the first type of appointment is selected by default
  triggerFirst: PropTypes.bool,
};

TypeAnimalSelector.defaultProps = {
  onSelect: () => { },
  triggerFirst: true,
};

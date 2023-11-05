import React, { useEffect, useState } from 'react';
import useAccount from '../../hooks/useAccount';
import { getAllTypeAnimal, getTypeAnimal, saveAnimal } from '../../api/TakeAVetClient';
import TypeAnimalSelector from '../TypeAnimal/TypeAnimalSelector.jsx';

export default function AddAnimalForm() {
  const [formState, setFormState] = useState({
    name: '',
    note: '',
    specificRace: '',
    gender: 'M',
    birthday: '',
    inFarm: false,
    isGroup: false,
    type: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    saveAnimal(formState).then(() => {
      setFormState({
        ...formState,
        name: '',
        note: '',
        specificRace: '',
        gender: 'M',
        birthday: '',
        inFarm: false,
        isGroup: false,
        type: '',
      });
    });
  };
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };
  const handleChangeCheckbox = (event) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value === 'on',
    });
  };
  const { isNotLoggedIn } = useAccount();
  if (isNotLoggedIn) {
    return (<p className="text-center"> Veuillez vous connecter</p>);
  }
  console.log(formState);
  return (
    <form className="form-control d-flex flex-column gap-2" onSubmit={handleSubmit}>
      <label className="col-form-label">Nom de l'animal* :</label>
      <input className="form-text" id="name" onChange={handleChange} />

      <label className="col-form-label">Renseignez une note* :</label>
      <textarea className="form-text" id="note" onChange={handleChange} />

      <label className="col-form-label">Race de l'animal :</label>
      <TypeAnimalSelector
        onSelect={(data) => {
          setFormState({
            ...formState,
            type: `/api/type_animals/${data.id}`,
          });
        }}
        triggerFirst
      />

      <label className="col-form-label">Race spécifique :</label>
      <input className="form-text" id="specificRace" onChange={handleChange} />

      <label className="col-form-label">Genre de l'animal* :</label>
      <select className="form-select" id="gender" onChange={handleChange}>
        <option value="M">Male</option>
        <option value="F">Femelle</option>
      </select>

      <label className="col-form-label">Date de naissance* :</label>
      <input type="date" className="form-text" id="birthday" onChange={handleChange} />

      <label className="col-form-label">Animal de ferme ?</label>
      <input type="checkbox" className="form-check" id="inFarm" onChange={handleChangeCheckbox} />

      <label className="col-form-label">Est-il dans un groupe ?</label>
      <input type="checkbox" className="form-check" id="isGroup" onChange={handleChangeCheckbox} />

      <button type="submit" className="btn btn-primary">Enregistrer un animal</button>
    </form>
  );
}

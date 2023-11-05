import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AnimalItem from '../components/Animals/AnimalItem';
import BasePage from '../components/BasePage';
import { getAllAnimalAsClient } from '../api/TakeAVetClient';
import Loading from '../components/Loading';

export default function AnimalRoute() {
  const [animalData, setAnimalData] = useState(undefined);
  const [errorText, setErrorText] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    getAllAnimalAsClient().then((x) => {
      setAnimalData(x.data['hydra:member']);
    })
      .catch((error) => {
        setErrorText(error.message);
      });
  }, []);
  const onAddAnimalClicked = () => {
    navigate('/animals/addAnimal');
  };
  return (
    <BasePage title="Mes animaux">
      {(errorText || !animalData) && <Loading error={errorText} centered />}
      <button onClick={onAddAnimalClicked} type="button" className="btn btn-primary">
        Ajouter un animal
      </button>
      <Outlet />
      {animalData
          && (
          <div className="border border-1 rounded">
            {animalData.map((animal) => (
              <AnimalItem
                data={animal}
                animalId={animal.id}
                onNoteChange={(animalId, note) => {
                  // TODO: update note
                  console.log(animalId, note);
                }}
              />
            ))}
          </div>
          )}
    </BasePage>
  );
}

import React, { useEffect, useState } from 'react';
import { getAllRecapsFromAnimal, getAnimal } from '../api/TakeAVetClient';
import { useParams } from 'react-router-dom';
import BasePage from '../components/BasePage';
import useAccount from '../hooks/useAccount';
import Loading from '../components/Loading';
import AnimalRecap from '../components/Animals/AnimalRecap';

export default function AnimalRecapRoute() {
    const [recapData, setRecapData] = useState(undefined);
    const { isNotLoggedIn, isFullyLoggedIn, isLoading } = useAccount();
    const [nameAnimal, setNameAnimal] = useState(undefined);

    const params = useParams();

    getAnimal(params.animalId).then((animal) => {
        setNameAnimal(animal.data.name);
    });

    useEffect(() => {
        if (isFullyLoggedIn()) {
            getAllRecapsFromAnimal(params.animalId).then((recap) => {
                setRecapData(recap.data['hydra:member']);
                console.log("recap:", recap);
                console.log("recap data:", recap.data['hydra:member']);
            });
        }
    }, [isFullyLoggedIn()]);

    return (
        <BasePage title={`Récapitulatif de l'animal ${nameAnimal}`}>
        {isLoading && <Loading centered />}
        {isNotLoggedIn && <p className="text-center">Vous devez être connecté pour accéder à cette page !</p>}
        {recapData && recapData.map((recap) => (
            <div className="recap_animal border border-1 rounded" key={recap.id}>
                <AnimalRecap recap={recap} />
            </div>
        ))}
        </BasePage>
    );
}

import React from "react";
import { formatDate } from '@fullcalendar/core';
import Loading from '../Loading';
import useAccount from "../../hooks/useAccount";

export default function AnimalRecap({ recap }) {
    const { isNotLoggedIn, isLoading } = useAccount();

    return (
        <div className="recap_informations">
            {isLoading && <Loading centered />}
            {isNotLoggedIn && <p className="text-center">Vous devez être connecté pour accéder à cette page !</p>}
            <h3 className="recap__title">Récapitulatif du {formatDate(recap.updatedAt)}</h3>
            <div className="details">
                <p><b>Informations de santé</b>: {recap.healthInfos}</p>
                    <p><b>Poids de l'animal</b>: {recap.weight} kgs</p>
                    <p><b>Taille de l'animal</b>: {recap.height} cms</p>
                    <p><u>Autres informations complémentaires</u>: {recap.otherInfos}</p>
            </div>
        </div>
    )
}

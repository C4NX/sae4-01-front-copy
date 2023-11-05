import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import AnimalSlideshow from '../Animals/AnimalSlideshow';
import getGenderString from '../../services/transformers/getGenderString';

export default function AnimalCard(props) {
  const { animal } = props;

  const getAge = () => new Date().getFullYear() - new Date(animal.member.birthday).getFullYear();

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">
          {animal.member.name}
          {' '}
          (
          {getGenderString(animal.member.gender)}
          )
          {' - '}
          {animal.member.type.name}
          {' '}
          <FontAwesomeIcon icon={faPaw} />
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">Âge :</h6>
        <p className="card-text">
          {getAge()}
          {' '}
          ans
          {' ( environ le '}
          {formatDate(animal.member.birthday, {
            year: 'numeric', month: 'long', day: 'numeric', locale: 'fr',
          })}
          {' )'}
        </p>
        <h6 className="card-subtitle mb-2 text-muted">Note :</h6>
        <textarea className="form-control" value={animal.member.note} readOnly />
        <div className="my-2 text-end">
          {animal.member.inFarm && <span className="badge rounded-pill text-bg-info">Ferme</span>}
          {animal.member.isGroup && <span className="badge rounded-pill text-bg-warning">Groupe d'animaux</span>}
        </div>
        <AnimalSlideshow animalId={animal.member.id} name="animalSlideshow" width="80vh" />
      </div>
    </div>
  );
}

AnimalCard.propTypes = {
  animal: PropTypes.shape({
    member: PropTypes.shape({
      name: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      gender: PropTypes.string,
      inFarm: PropTypes.bool.isRequired,
      isGroup: PropTypes.bool.isRequired,
      birthday: PropTypes.string.isRequired,
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }),
};

AnimalCard.defaultProps = {
  animal: null,
};

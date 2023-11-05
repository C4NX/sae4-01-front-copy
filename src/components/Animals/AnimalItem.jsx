import PropTypes from 'prop-types';
import { React, useRef } from 'react';
import { formatDate } from '@fullcalendar/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake, faCalendarTimes, faImage, faNotesMedical, faPaperclip, faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import AnimalSlideshow from './AnimalSlideshow';
import { useNavigate } from 'react-router-dom';

export default function AnimalItem(props) {
  const {
    data, animalId, onNoteChange,
  } = props;

  const noteElmtRef = useRef();
  const navigate = useNavigate();

  const age = new Date().getFullYear() - new Date(data.birthday).getFullYear();

  const handleChange = () => {
    onNoteChange(animalId, noteElmtRef.current.value);
  };

  const seeRecapOfAnimal = () => {
    navigate(`/animal/recap/${animalId}`);
  };

  return (
    <div className="m-2 my-3">
      <p className="border border-1 m-0 p-2 border-bottom-0 color-dgr text-center">
        <i className={`fas ${data.type.icon}`} />
        {' '}
        <strong>{data.name}</strong>
        {' '}
        -
        {' '}
        <i>
          {data.type.name}
          {' '}
        </i>
      </p>
      <div>
        <table className="table p-2 border-1 border">
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faBirthdayCake} />
                {' '}
                Date de naissance
              </td>
              <td>
                {formatDate(data.birthday, {
                  year: 'numeric', month: 'long', day: 'numeric', locale: 'fr',
                })}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faCalendarTimes} />
                {' '}
                Age
              </td>
              <td>
                {age === 0 ? 'Moins d\'un an' : `${age} ans`}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faNotesMedical} />
                {' '}
                Note
              </td>
              <td>
                <textarea className="form-control" value={data.note} readOnly ref={noteElmtRef} />
                <div className="d-flex justify-content-end my-2">
                  <button type="button" className="btn btn-primary" onClick={handleChange}>Modifier</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faQuestionCircle} />
                {' '}
                Race
              </td>
              <td>
                {data.type.name}
                {' / '}
                {data.specificRace ?? 'Pas de race spécifique'}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faPaperclip} />
                {' '}
                Tags
              </td>
              <td>
                {data.inFarm ? <span className="badge badge-2 rounded-pill">élevage</span> : <span className="badge badge-2 rounded-pill">Domestique</span>}
                {(data.isGroup || true) && <span className="badge badge-1 rounded-pill">Groupe</span>}
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faImage} />
                {' '}
                Images
              </td>
              <td>
                <AnimalSlideshow animalId={animalId} width={500} ownerMode />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={seeRecapOfAnimal}
          >
            Voir le récapitulatif de
            {' '}
            {data.name}
          </button>
          <button
            type="button"
            className="btn btn-primary"
          >
            Voir les rendez vous de
            {' '}
            {data.name}
          </button>
          {' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <button
            type="button"
            className="btn btn-danger"
          >
            Supprimer
            {' '}
            {data.name}
          </button>
        </div>
      </div>
    </div>
  );
}
AnimalItem.propTypes = {
  animalId: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specificRace: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    inFarm: PropTypes.bool.isRequired,
    gender: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
    isGroup: PropTypes.bool.isRequired,
  }),
  onNoteChange: PropTypes.func,
};

AnimalItem.defaultProps = {
  data: {
    name: 'Nom',
    specificRace: 'Race',
    birthday: new Date().toString(),
    inFarm: false,
  },
  onNoteChange: () => {},
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AgendaCalendar from './AgendaCalendar';
import { getAllVeterinary } from '../../api/TakeAVetClient';
import getIdFromHydraUrl from '../../services/transformers/getIdFromHydraUrl';
import Loading from '../Loading';

const ERROR_TEXT = 'Erreur lors du chargement des données.';

export default function AgendaSelector(props) {
  const {
    className, onVetoChange,
    defaultAgenda, editMode,
    disableTitle, editModeEventDuration,
    onEditDateChanged, firstTrigger,
    onAgendaChange,
  } = props;

  // handle all vets names <option> elements
  const [vetNamesOptions, setVetNamesOptions] = useState([]);

  // handle the name of the selected vet
  // null means that the component is not ready yet
  const [name, setName] = useState(null);
  // handle the id of the selected vet
  const [agendaId, setAgendaId] = useState(defaultAgenda);

  // handle error state
  const [isError, setIsError] = useState(false);

  // on start up, get all vets names
  useEffect(() => {
    getAllVeterinary().then((response) => {
      // if name is null, it means that the component is mounted for the first time,
      // so we set the name and the id of the first vet

      const allVetsWithAnAgenda = response.member.filter((e) => e.agenda);
      if (name === null) {
        if (firstTrigger) {
          onVetoChange(+allVetsWithAnAgenda[0].id);
          onAgendaChange(getIdFromHydraUrl(allVetsWithAnAgenda[0].agenda));
        }
        setAgendaId(getIdFromHydraUrl(allVetsWithAnAgenda[0].agenda));
        setName(`${allVetsWithAnAgenda[0].lastName} ${allVetsWithAnAgenda[0].firstName}`);
      }

      const vetNames = allVetsWithAnAgenda.map((vet) => (
        <option
          key={vet.id}
          value={getIdFromHydraUrl(vet.agenda)}
          disabled={vet.agenda === undefined}
          data-vet-id={vet.id}
          data-agenda-id={getIdFromHydraUrl(vet.agenda)}
        >
          {vet.lastName}
          {' '}
          {vet.firstName}
        </option>
      ));
      setVetNamesOptions(vetNames);
    }).catch((e) => {
      setIsError(true);
      throw e;
    });
  }, []);

  // handle vet change, and set all the states
  const onChange = (event) => {
    const vId = +event.target.selectedOptions[0].dataset.vetId;
    const aId = +event.target.selectedOptions[0].dataset.agendaId;

    setAgendaId(aId);
    setName(event.target.selectedOptions[0].text);

    onVetoChange(vId);
    onAgendaChange(aId);
  };

  return (
    <div className={className}>
      {name === null ? (
        <Loading text="Chargment de l'agenda..." error={isError ? ERROR_TEXT : null} centered />
      ) : (
        <>
          <div className="my-3">
            {!disableTitle && (
              <h1 style={{ textAlign: 'center' }}>
                {`Agenda de ${name}`}
              </h1>
            ) }
            <form className="m-4">
              <label htmlFor="vetSelector" style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ alignSelf: 'center' }} className="px-2">Vétérinaire</span>
                <select id="vetSelector" onChange={onChange} className="form-select" style={{ flexShrink: 1 }}>
                  {vetNamesOptions}
                </select>
              </label>
            </form>
          </div>
          {agendaId != null
            ? (
              <AgendaCalendar
                agendaId={agendaId}
                editMode={editMode}
                editModeEventDuration={editModeEventDuration}
                onEditDateChanged={onEditDateChanged}
              />
            )
            : <Loading text="Chargment de l'agenda..." error={isError ? ERROR_TEXT : null} centered /> }
        </>
      )}
    </div>
  );
}

AgendaSelector.propTypes = {
  className: PropTypes.string,
  onVetoChange: PropTypes.func,
  onAgendaChange: PropTypes.func,
  defaultAgenda: PropTypes.number,
  editMode: PropTypes.bool,
  editModeEventDuration: PropTypes.number,
  disableTitle: PropTypes.bool,
  onEditDateChanged: PropTypes.func,
  firstTrigger: PropTypes.bool,
};

AgendaSelector.defaultProps = {
  className: '',
  onVetoChange: () => {},
  onAgendaChange: () => {},
  defaultAgenda: 1,
  editMode: false,
  editModeEventDuration: 30,
  disableTitle: false,
  onEditDateChanged: () => {},
  firstTrigger: false,
};

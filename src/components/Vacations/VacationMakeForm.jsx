import React, { useState, useRef } from 'react';
import { postVacation } from '../../api/TakeAVetClient';

export default function VacationMakeForm() {
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const libRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsAdding(true);
    setSuccess(false);
    setError(null);

    postVacation({
      lib: libRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  return (
    <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
      <h2>Ajouter vos vacances</h2>
      {success && <div className="alert alert-success">Vacance ajoutée avec succès</div>}
      {error && (
      <div className="alert alert-danger">
        Une erreur est survenue:
        {' '}
        {error}
      </div>
      )}
      <div className="d-flex gap-2">
        <label htmlFor="vacation-lib" className="d-flex gap-2 flex-grow-1">
          Nom
          <input type="text" id="vacation-lib" className="form-control" ref={libRef} required minLength={1} />
        </label>
        <label htmlFor="vacation-startDate" className="d-flex gap-2 flex-grow-1">
          Date de début
          <input type="date" className="form-control" id="vacation-startDate" ref={startDateRef} required />
        </label>
        <label htmlFor="vacation-endDate" className="d-flex gap-2 flex-grow-1">
          Date de fin
          <input type="date" className="form-control" id="vacation-endDate" ref={endDateRef} required />
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isAdding}>Ajouter vos vacances</button>
    </form>
  );
}

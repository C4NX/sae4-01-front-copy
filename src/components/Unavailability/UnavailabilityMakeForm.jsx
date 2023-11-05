import React, { useState, useRef } from 'react';
import { postUnavailability } from '../../api/TakeAVetClient';

export default function UnavailabilityMakeForm() {
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

    postUnavailability({
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
      <h2>Ajouter une indisponibilité</h2>
      {success && <div className="alert alert-success">Indisponibilité ajoutée avec succès</div>}
      {error && (
      <div className="alert alert-danger">
        Une erreur est survenue:
        {' '}
        {error}
      </div>
      )}
      <div className="d-flex gap-2">
        <label htmlFor="unavailability-lib" className="d-flex gap-2 flex-grow-1">
          Nom
          <input type="text" id="unavailability-lib" className="form-control" ref={libRef} required minLength={1} />
        </label>
        <label htmlFor="unavailability-startDate" className="d-flex gap-2 flex-grow-1">
          Date de début
          <input type="datetime-local" className="form-control" id="unavailability-startDate" ref={startDateRef} required />
        </label>
        <label htmlFor="unavailability-endDate" className="d-flex gap-2 flex-grow-1">
          Date de fin
          <input type="datetime-local" className="form-control" id="unavailability-endDate" ref={endDateRef} required />
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isAdding}>Ajouter l'indisponibilité</button>
    </form>
  );
}

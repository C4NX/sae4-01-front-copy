import React, { useEffect, useState } from 'react';
import { saveThread } from '../../api/TakeAVetClient';
import useAccount from '../../hooks/useAccount';

export function ThreadForm() {
  const [formState, setFormState] = useState({
    subject: '',
    description: '',
  });
  const { isNotLoggedIn } = useAccount();
  if (isNotLoggedIn) {
    return (<p className="text-center"> Veuillez vous connecter</p>);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    saveThread(formState).then(() => {
      setFormState({
        ...formState,
        subject: '',
        description: '',
      });
    });
  };
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="form__thread">
      <label className="form-label">Le sujet :</label>
      <textarea className="form-text" id="subject" onChange={handleChange} />
      <label className="form-label">La description :</label>
      <textarea className="form-text" id="description" onChange={handleChange} />
      <button type="submit" className="btn btn-primary">Envoyer</button>
    </form>
  );
}

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAccount from '../../hooks/useAccount';

export default function ChangeUserInformationsForm(props) {
  const { className } = props;
  const {
    getUser, isFullyLoggedIn, updateInformation, refreshUser,
  } = useAccount();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    if (isFullyLoggedIn()) {
      const user = getUser();
      setFormState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
  }, [isFullyLoggedIn()]);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Requested to update user informations with:', formState);
    updateInformation(formState).then((response) => {
      console.log('User informations updated:', response);
      refreshUser();
    });
  };

  return (
    <form className={`d-flex flex-column ${className}`} onSubmit={handleSubmit}>
      <h2>Changer vos informations</h2>
      <div className="d-flex flex-column gap-1">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" className="form-control" onChange={handleChange} value={formState.firstName} />
        <label htmlFor="lastName">Nom</label>
        <input type="text" id="lastName" className="form-control" onChange={handleChange} value={formState.lastName} />
        <label htmlFor="phone">Téléphone</label>
        <input type="tel" id="phone" className="form-control" onChange={handleChange} value={formState.phone} />
        <button type="submit" className="btn btn-primary my-2">Mettre à jour mes informations</button>
      </div>
    </form>
  );
}

ChangeUserInformationsForm.propTypes = {
  className: PropTypes.string,
};

ChangeUserInformationsForm.defaultProps = {
  className: '',
};

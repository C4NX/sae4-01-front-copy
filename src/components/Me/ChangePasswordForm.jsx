import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useAccount from '../../hooks/useAccount.js';

export default function ChangePasswordForm(props) {
  const newPassword = useRef();
  const newPasswordConfirm = useRef();
  const { className } = props;

  const { isFullyLoggedIn, updateInformation, refreshUser } = useAccount();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFullyLoggedIn()) {
      if (newPassword.current.value !== newPasswordConfirm.current.value) {
        // eslint-disable-next-line no-alert
        alert('Les mots de passe ne correspondent pas');
        return false;
      }

      updateInformation({
        password: newPassword.current.value,
      }).then((response) => {
        console.log('User informations updated:', response);
        refreshUser();
      });
    }

    return true;
  };

  return (
    <form className={`d-flex flex-column gap-2 ${className}`} onSubmit={handleSubmit}>
      <h2>Changer de mot de passe</h2>
      {/* <div className="d-flex flex-column"> */}
      {/*  <label htmlFor="oldPassword">Ancien mot de passe</label> */}
      {/*  <input type="password" id="oldPassword" className="form-control" ref={oldPassword} /> */}
      {/* </div> */}
      <div className="d-flex flex-column">
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <input type="password" id="newPassword" className="form-control" ref={newPassword} />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="newPasswordConfirm">Confirmer le nouveau mot de passe</label>
        <input type="password" id="newPasswordConfirm" className="form-control" ref={newPasswordConfirm} />
      </div>
      <button type="submit" className="btn btn-primary my-2">Changer de mot de passe</button>
    </form>
  );
}

ChangePasswordForm.propTypes = {
  className: PropTypes.string,
};

ChangePasswordForm.defaultProps = {
  className: '',
};

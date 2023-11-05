import React from 'react';
import PropTypes from 'prop-types';

export default function AddressCard(props) {
  const { address } = props;

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Adresse</h5>
        <h6 className="card-subtitle mb-2 text-muted">Nom :</h6>
        <p className="card-text">{address.member.name}</p>
        <h6 className="card-subtitle mb-2 text-muted">Adresse :</h6>
        <p className="card-text">{address.member.ad}</p>
        <h6 className="card-subtitle mb-2 text-muted">Code postal :</h6>
        <p className="card-text">{address.member.pc}</p>
        <h6 className="card-subtitle mb-2 text-muted">Ville :</h6>
        <p className="card-text">{address.member.city}</p>
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    member: PropTypes.shape({
      name: PropTypes.string.isRequired,
      ad: PropTypes.string.isRequired,
      pc: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

AddressCard.defaultProps = {
  address: null,
};

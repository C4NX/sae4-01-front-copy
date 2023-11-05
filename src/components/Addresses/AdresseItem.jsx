import React from 'react';
import PropTypes from 'prop-types';

export default function AdresseItem(props) {
  const {
    data,
    onEdit,
    onDelete,
    disabled,
  } = props;

  return (
    <div className="d-flex gap-2 align-items-center">
      <span>
        {' '}
        {data?.ad}
        ,
        {' '}
        <i>{data?.pc}</i>
        ,
        {' '}
        {data?.city}
        {' '}
        <span className="badge text-bg-primary">{data?.name}</span>
      </span>
      <button type="button" className="btn btn-outline-primary" onClick={() => onEdit(data)} disabled={disabled}>Modifier</button>
      <button type="button" className="btn btn-outline-danger" onClick={() => onDelete(data)} disabled={disabled}>Supprimer</button>
    </div>
  );
}

AdresseItem.propTypes = {
  data: PropTypes.shape(AdresseItem.dataProps).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

AdresseItem.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
  disabled: false,
};

AdresseItem.dataProps = {
  name: PropTypes.string.isRequired,
  adresse: PropTypes.string.isRequired,
  pc: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

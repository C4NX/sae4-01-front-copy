import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export default function Loading(props) {
  const {
    text, className, centered, error, justifyCentered,
  } = props;
  return (
    <p className={`${centered ? 'text-center align-self-center' : ''} ${justifyCentered ? 'justify-content-center ' : ''} ${className}`}>
      {
        error
          ? (
            <p>
              <FontAwesomeIcon icon={faWarning} />
              <span className="text-danger">
                {' '}
                Erreur :
                {' '}
                {error}
              </span>
            </p>
          )
          : (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              {' '}
              {text}
            </>
          )
      }
    </p>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  centered: PropTypes.bool,
  justifyCentered: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Chargement...',
  centered: false,
  className: '',
  error: null,
  justifyCentered: false,
};

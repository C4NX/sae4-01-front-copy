import React from 'react';
import PropTypes from 'prop-types';

export default function SocialShares(props) {
  const { url } = props;

  const shareUrl = url ?? window.location.href;

  return (
    <div className="d-flex justify-content-center gap-2 align-content-center">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">
        <i className="fab fa-facebook-square fa-2x" />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer">
        <i className="fab fa-twitter-square fa-2x" />
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target="_blank" rel="noreferrer">
        <i className="fab fa-linkedin fa-2x" />
      </a>
    </div>
  );
}

SocialShares.propTypes = {
  url: PropTypes.string,
};

SocialShares.defaultProps = {
  url: null,
};

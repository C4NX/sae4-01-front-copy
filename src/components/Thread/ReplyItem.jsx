import React from 'react';
import { formatDate } from '@fullcalendar/core';
import PropTypes from 'prop-types';

export function ReplyItem(props) {
  const {
    description, createdAt,
  } = props;
  return (
    <div className="threadReply__item">
      <p>
        {description}
        {' '}
      </p>
      <p className="thread__messages_item_author">
        {formatDate(createdAt)}
      </p>
    </div>

  );
}

ReplyItem.propTypes = {
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

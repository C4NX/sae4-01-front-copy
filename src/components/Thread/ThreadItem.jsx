import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/core';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import useAccount from '../../hooks/useAccount';
import { updateThread } from '../../api/TakeAVetClient';

export default function ThreadItem(props) {
  const {
    subject, description, isResolved, replyCount, createdAt, author, threadId, authorId,
  } = props;
  const [resolved, setResolved] = useState(isResolved);
  const navigate = useNavigate();
  const { getUser } = useAccount();
  const isUser = authorId === getUser()?.id ?? false;
  const onReplyClicked = () => {
    navigate(`/faq/${threadId}`);
  };
  const onResolvedClicked = () => {
    updateThread(threadId, { resolved: !resolved }).then(() => setResolved(!resolved));
  };
  const onSeeClicked = () => {
    navigate(`/faq/thread/${threadId}`);
  };
  return (
    <div className="d-flex flex-column border border-1 p-2 rounded">
      <h4>{subject}</h4>
      <p>
        {description}
        {' '}
        <span className="badge bg-primary rounded-pill">
          {replyCount}
          {' '}
          réponses
        </span>
      </p>
      <p className="thread__messages_item_author">
        <FontAwesomeIcon icon={faCalendarDays} />
        {' '}
        {formatDate(createdAt)}
        {' '}
        |
        {' '}
        <FontAwesomeIcon icon={faCircleUser} />
        {' '}
        {author}
        {' '}
        |
        {' '}
        {resolved === false ? <span className="badge bg-danger rounded-pill">Non résolu</span> : <span className="badge bg-success rounded-pill">Résolu</span>}
      </p>
      <div className="mt-2">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSeeClicked}
        >
          Voir les
          réponses
        </button>
        {' '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        {resolved === false && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onReplyClicked}
        >
          Répondre
        </button>
        )}
        {' '}
        {(isUser && !resolved) && (
        <button
          type="button"
          className="btn btn-success"
          onClick={onResolvedClicked}
        >
          Votre question est résolue ?
        </button>
        )}
      </div>
    </div>

  );
}

ThreadItem.propTypes = {
  isResolved: PropTypes.bool,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  replyCount: PropTypes.number,
  author: PropTypes.string,
  threadId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
};

ThreadItem.defaultProps = {
  isResolved: false,
  replyCount: 0,
  author: 'Anonyme',
};

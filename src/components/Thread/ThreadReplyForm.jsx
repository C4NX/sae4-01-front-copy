import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { replyToThread } from '../../api/TakeAVetClient';

export default function ThreadReplyForm(props) {
  const { threadId } = props;
  const [reply, setReply] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    replyToThread(reply, threadId).then(() => {
      setReply('');
    });
  };
  return (
    <form onSubmit={handleSubmit} className="form-control d-flex flex-column gap-2">
      <label className="col-form-label">Répondre à cette question :</label>
      <textarea className="form-text" value={reply} onChange={(event) => setReply(event.target.value)} />
      <button type="submit" className="btn btn-primary">Envoyer</button>
    </form>
  );
}
ThreadReplyForm.propTypes = {
  threadId: PropTypes.number.isRequired,
};

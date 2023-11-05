import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllReplyFrom, getClient } from '../api/TakeAVetClient';
import { ReplyItem } from '../components/Thread/ReplyItem';
import ThreadItem from '../components/Thread/ThreadItem';

export function AllThreadReplyRoute() {
  const thread = useLoaderData();
  const [replies, setReplies] = useState();

  useEffect(() => {
    getAllReplyFrom(thread.data.id, 1).then((result) => setReplies(result.member));
  }, [thread]);
  return (
    <div id="current-thread">
      <ThreadItem
        createdAt={thread.data.createdAt}
        subject={thread.data.subject}
        description={thread.data.description}
        key={thread.data.id}
        threadId={thread.data.id}
        authorId={thread.data.author.id ?? 0}
        author={`${thread.data.author.firstName} ${thread.data.author.lastName}`}
        replyCount={thread.data.replyCount}
        isResolved={thread.data.resolved}
      />
      {replies && replies.map((reply) => (
        <ReplyItem
          description={reply.description}
          createdAt={reply.createdAt}
          key={reply.id}
        />
      ))}
      {!replies && <p>Il n'y a pas encore de réponses </p>}
    </div>
  );
}

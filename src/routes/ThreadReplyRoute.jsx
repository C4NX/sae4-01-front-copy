import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllReplyFrom, getOneThread } from '../api/TakeAVetClient';
import ThreadReplyForm from '../components/Thread/ThreadReplyForm';
import ThreadItem from '../components/Thread/ThreadItem';
import { ReplyItem } from '../components/Thread/ReplyItem';

export default function ThreadReplyRoute() {
  const thread = useLoaderData();
  const [replies, setReplies] = useState();
  useEffect(() => {
    document.getElementById('current-thread')?.scrollIntoView(false);
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
      <ThreadReplyForm threadId={thread.data.id} />
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
export async function loader({ params }) {
  const thread = await getOneThread(params.threadId);
  if (!thread) throw new Response('', { status: 404 });
  return thread;
}

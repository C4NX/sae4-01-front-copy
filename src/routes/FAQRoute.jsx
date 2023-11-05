import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getAllThread } from '../api/TakeAVetClient';
import BasePage from '../components/BasePage';
import ThreadItem from '../components/Thread/ThreadItem';
import Loading from '../components/Loading';

export default function FAQRoute() {
  const [threadData, setThreadData] = useState(undefined);
  const navigate = useNavigate();
  const onQuestionClicked = () => {
    navigate('/faq/thread');
  };
  useEffect(() => {
    getAllThread(1).then((x) => {
      setThreadData(x.data['hydra:member']);
    });
  }, []);
  return (
    <BasePage>
      <h1 className="title">Foire aux questions</h1>
      <button
        type="button"
        className="btn btn-primary main_buttons"
        onClick={onQuestionClicked}
      >
        Posez vos questions ici !
      </button>
      <Outlet />
      {threadData === undefined ? <Loading text="en chargement..." centered /> : (
        <div className="d-flex flex-column gap-4">
          {threadData.map((thread) => (
            <ThreadItem
              createdAt={thread.createdAt}
              subject={thread.subject}
              description={thread.description}
              key={thread.id}
              threadId={thread.id}
              authorId={thread.author.id ?? 0}
              author={`${thread.author.firstName} ${thread.author.lastName}`}
              replyCount={thread.replyCount}
              isResolved={thread.resolved}
            />
          ))}
        </div>
      ) }
    </BasePage>
  );
}

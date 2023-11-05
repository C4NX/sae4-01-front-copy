import React from 'react';
import BasePage from '../components/BasePage';
import MeAvatarForm from '../components/Me/MeAvatarForm';
import useAccount from '../hooks/useAccount';
import Loading from '../components/Loading';
import ChangePasswordForm from '../components/Me/ChangePasswordForm';
import ChangeUserInformationsForm from '../components/Me/ChangeUserInformationsForm';

export default function MeRoute() {
  const {
    isFullyLoggedIn, isLoading, isNotLoggedIn, getUser,
  } = useAccount();

  const user = getUser();

  return (
    <BasePage title="Mon compte">
      <div className="d-flex m-3 gap-2">
        {isFullyLoggedIn()
            && (
            <>
              <MeAvatarForm userId={user?.id} />
              <div className="flex-grow-1 mx-5 d-flex flex-column gap-2">
                <ChangeUserInformationsForm />
                <hr />
                <ChangePasswordForm />
              </div>
            </>
            )}
        {isLoading && <Loading text="Chargement de votre profile..." />}
        {isNotLoggedIn && <span>Vous devez être connecté pour accéder à cette page.</span>}
      </div>
    </BasePage>
  );
}

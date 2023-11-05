import { useContext } from 'react';
import { UserContext } from '../contexts/user/index';
import { updateUser } from '../api/TakeAVetClient';

export default function useAccount() {
  const userContext = useContext(UserContext);

  const isFullyLoggedIn = () => userContext !== undefined && userContext !== null;
  const getUser = () => {
    if (isFullyLoggedIn()) {
      return userContext.getMember();
    }
    return null;
  };
  const refreshUser = () => {
    userContext.refresh();
  };

  return {
    /**
     * @returns {boolean} True if the user is logged in and is a Veto user.
     */
    isVeto: () => isFullyLoggedIn() && userContext.isType('Veto'),
    /**
     * @returns {boolean} True if the user is logged in and is a Client user.
     */
    isClient: () => isFullyLoggedIn() && userContext.isType('Client'),
    /**
     * @returns {boolean} True if the user is logged in and is an Admin user.
     */
    isAdmin: () => isFullyLoggedIn() && (userContext?.getMember()?.isAdmin ?? false),
    /**
     * @returns {boolean} True if the user is logged in.
     */
    isFullyLoggedIn,
    /**
     * @returns {boolean} True if the user is in loading state.
     */
    isLoading: userContext === undefined,
    /**
     * @returns {boolean} True if the user is 'failed to load' state.
     */
    isNotLoggedIn: userContext === null,
    /**
     * @returns {Object[]|Object} the hydra:member or the user object.
     */
    getUser,
    /**
     * Refreshes the user context.
     * @returns {void}
     */
    refreshUser,
    updateInformation: (newInformation) => updateUser(getUser()?.id, newInformation),
    /**
     * @returns {any} the hydra context.
     */
    hydra: () => userContext,
  };
}

import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/TakeAVetClient';

import { UserContext } from '.';

export default function Provider(props) {
  const [userData, setUserData] = useState(null);

  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const refresh = () => {
    setUserData(undefined);
    getMe(() => {}).then((data) => {
      // eslint-disable-next-line no-console
      console.log('Loaded user data:', data);
      setUserData({
        ...data,
        refresh: () => refresh(),
        isType: (type) => data.isType(type),
        getMember: () => data.member,
      });
    }).catch(() => {
      setUserData(null);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
}

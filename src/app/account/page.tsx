'use client';

import * as React from 'react';
import Account from '@src/app/account/Account';
import mockUser from '@src/mocks/users.json';

const AccountPage = () => {
  const user = mockUser.data;
  return (
    <Account user={user}/>
  );
};

export default AccountPage;
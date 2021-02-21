import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PrivatePage from './PrivatePage';
import Loader from '../components/Loader/Loader';
import { UserDef } from '../types/authTypes';
import { AppReducer } from '../types/baseTypes';

const ProfileContent = (props: { userDef: null | UserDef}) => {
  if (!props.userDef) return <Loader />;

  return (
    <div className="profile" style={{ fontFamily: 'monospace' }}>
      {JSON.stringify(props.userDef, null, 2)}
    </div>
  );
};

const ProfilePage = () => {
  const { userDef } = useSelector((state: AppReducer) => state.auth);

  return (
    <PrivatePage
      sidebarComponent={null}
      contentComponent={<ProfileContent userDef={userDef} />}
    />
  );
};

export default ProfilePage;



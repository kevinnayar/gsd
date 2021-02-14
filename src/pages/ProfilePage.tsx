import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PrivatePage from './PrivatePage';
import { Loader } from '../components/Loader/Loader';
import { UserDef } from '../types/authTypes';
import { AppReducer } from '../types/baseTypes';

const ProfileContent = (props: { userDef: null | UserDef}) => {
  console.log(props.userDef);
  
  if (props.userDef) {
    return (
      <div className="profile">
        {JSON.stringify(props.userDef, null, 2)}
      </div>
    );
  }

  return <Loader />;
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userDef } = useSelector((state: AppReducer) => state.auth);

  return (
    <PrivatePage
      sidebarComponent={null}
      contentComponent={<ProfileContent userDef={userDef} />}
    />
  );
};

export default ProfilePage;



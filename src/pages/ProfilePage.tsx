import * as React from 'react';
import { useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';
import Content from '../components/Content/Content';
import Logo from '../components/Logo/Logo';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import SidebarToggle from '../components/SidebarToggle/SidebarToggle';
import AuthedLinks from '../components/AuthedLinks/AuthedLinks';
import Loader from '../components/Loader/Loader';

import { UserDef } from '../types/authTypes';
import { AppReducer } from '../types/baseTypes';

function ProfileContent(props: { userDef: null | UserDef}) {
  if (!props.userDef) return <Loader />;

  return (
    <div className="profile" style={{ fontFamily: 'monospace' }}>
      {JSON.stringify(props.userDef, null, 2)}
    </div>
  );
}

function ProfilePage() {
  const { userDef } = useSelector((state: AppReducer) => state.auth);

  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
      </Sidebar>
      <Content>
        <AuthedLinks />
        <ProfileContent userDef={userDef} />
      </Content>
    </div>
  );
}

export default React.memo(ProfilePage);



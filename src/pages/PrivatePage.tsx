import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Sidebar } from '../component-core/Sidebar/Sidebar';
import { Content } from '../component-core/Content/Content';
import { Logo } from '../component-core/Logo/Logo';
import { ThemeSwitch } from '../component-core/ThemeSwitch/ThemeSwitch';
import { SidebarToggle } from '../component-core/SidebarToggle/SidebarToggle';
import { authLogout } from '../store/auth/authActions';

const PrivatePage = React.memo((props: { children: any }) => {
  const dispatch = useDispatch();

  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
      </Sidebar>
      <Content>
        {props.children}
      </Content>
      <button
        style={{ position: 'fixed', right: 20, top: 20, background: 'red', color: 'white' }}
        onClick={(e) => {
          e.preventDefault();
          dispatch(authLogout());
        }}
      >
        logout
      </button>
    </div>
  );
});

export default PrivatePage;
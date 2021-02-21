import * as React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Content from '../components/Content/Content';
import Logo from '../components/Logo/Logo';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import SidebarToggle from '../components/SidebarToggle/SidebarToggle';
import { MemoedAuthedLinks } from '../components/AuthedLinks/AuthedLinks';

const PrivatePage = (props: { sidebarComponent: any, contentComponent: any }) => {
  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
        {props.sidebarComponent}
      </Sidebar>
      <Content>
        <MemoedAuthedLinks />
        {props.contentComponent}
      </Content>
    </div>
  );
};

export default PrivatePage;
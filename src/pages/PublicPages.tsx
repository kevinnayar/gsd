import * as React from 'react';

import { Sidebar } from '../component-core/Sidebar/Sidebar';
import { Content } from '../component-core/Content/Content';
import { Logo } from '../component-core/Logo/Logo';
import { ThemeSwitch } from '../component-core/ThemeSwitch/ThemeSwitch';
import { SidebarToggle } from '../component-core/SidebarToggle/SidebarToggle';

const PublicPage = React.memo((props: { children: any }) => {
  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
      </Sidebar>
      <Content><h1>Public</h1>{props.children}</Content>
    </div>
  );
});

export default PublicPage;
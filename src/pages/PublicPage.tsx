import * as React from 'react'

import { Sidebar } from '../components/Sidebar/Sidebar';
import { Logo } from '../components/Logo/Logo';
import { ThemeSwitch } from '../components/ThemeSwitch/ThemeSwitch';
import { SidebarToggle } from '../components/SidebarToggle/SidebarToggle';
import { ImageRandomizer } from '../components/ImageRandomizer/ImageRandomizer';

const PublicPage = React.memo((props: { children: any }) => {
  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
        {props.children}
      </Sidebar>
      <ImageRandomizer />
    </div>
  );
});

export default PublicPage;
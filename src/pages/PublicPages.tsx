import * as React from 'react'

import { Sidebar } from '../component-core/Sidebar/Sidebar';
import { Logo } from '../component-core/Logo/Logo';
import { ThemeSwitch } from '../component-core/ThemeSwitch/ThemeSwitch';
import { SidebarToggle } from '../component-core/SidebarToggle/SidebarToggle';
import { AuthForm } from '../component-core/AuthForm/AuthForm';
import { ImageRandomizer } from '../component-core/ImageRandomizer/ImageRandomizer';

const PublicPage = React.memo((props: { children: any }) => {
  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        <SidebarToggle />
        <AuthForm>
          {props.children}
        </AuthForm>
      </Sidebar>
      <ImageRandomizer />
    </div>
  );
});

export default PublicPage;
import * as React from 'react'

import { Sidebar } from '../components/Sidebar/Sidebar';
import { Logo } from '../components/Logo/Logo';
import { ThemeSwitch } from '../components/ThemeSwitch/ThemeSwitch';
import { ImageRandomizer } from '../components/ImageRandomizer/ImageRandomizer';

const PublicPage = React.memo((props: { children: any }) => {
  if (document.body.classList.contains('sidebar--hidden')) {
    document.body.classList.replace('sidebar--hidden', 'sidebar--visible');
  } else {
    document.body.classList.add('sidebar--visible');
  }

  return (
    <div className="app">
      <Sidebar>
        <Logo />
        <ThemeSwitch />
        {props.children}
      </Sidebar>
      <ImageRandomizer />
    </div>
  );
});

export default PublicPage;
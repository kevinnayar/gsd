import * as React from 'react';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { AuthenticationLinks } from '../AuthenticationLinks/AuthenticationLinks';
import { IThemeMode } from '../../../types/baseTypes';

type HeaderProps = {
  title: string;
  themeMode: IThemeMode,
};

export function Header(props: HeaderProps) {
  return (
    <div className="app__header">
      <h1>{props.title}</h1>
      <ThemeSwitch themeMode={props.themeMode} />
      <AuthenticationLinks />
    </div>
  );
}



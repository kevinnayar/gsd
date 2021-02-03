import * as React from 'react';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { AuthenticationLinks } from '../AuthenticationLinks/AuthenticationLinks';
import { UserDef } from '../../types/authTypes';
import { ITaskItem } from '../../types/taskTypes';

type HeaderProps = {
  className: string,
  userDef: null | UserDef,
  logout: () => void,
  addTask: (task: ITaskItem) => void,
};

export function Header(props: HeaderProps) {
  return (
    <div className={props.className}>
      <h1>Get Shit Done</h1>
      <ThemeSwitch />
      <AuthenticationLinks userDef={props.userDef} logout={props.logout} addTask={props.addTask} />
    </div>
  );
}



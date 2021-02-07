import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Icon } from '../Icon/Icon';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { TaskList } from '../TaskList/TaskList';

import { AppReducer } from '../../types/baseTypes';

type SidebarProps = {
  className: string,
  collapsed: boolean,
  setCollapsed: (c: boolean) => void;
};

export function Sidebar(props: SidebarProps) {
  const { taskMap } = useSelector((state: AppReducer) => state.tasks);
  const toggleCollapsed = () => props.setCollapsed(!props.collapsed);

  return (
    <div className={props.className}>
      <Icon iconName={props.collapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'} className="collapse" onClick={toggleCollapsed} />
      <h1>get.shit.done</h1>
      <ThemeSwitch />
      {taskMap && <TaskList taskMap={taskMap} />}
    </div>
  );
}



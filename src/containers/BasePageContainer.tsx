import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ImageRandomizer } from '../components/ImageRandomizer/ImageRandomizer';
import { AppReducer } from '../types/baseTypes';

export default function BasePage(props: { children: any }) {
  const { userDef } = useSelector((state: AppReducer) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const getClassNames = (prefix: string) => `${prefix} ${prefix}--sidebar-${collapsed ? 'hidden' : 'visible'}`;

  return (
    <div className={getClassNames('app')}>
      <Sidebar className={getClassNames('app__sidebar')} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={getClassNames('app__content')}>{props.children}</div>
      {!userDef && <ImageRandomizer />}
    </div>
  );
}



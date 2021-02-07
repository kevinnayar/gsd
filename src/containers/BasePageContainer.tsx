import * as React from 'react';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';

export default function BasePage(props: { children: any }) {
  const [collapsed, setCollapsed] = useState(false);
  const getClassNames = (prefix: string) => `${prefix} ${prefix}--sidebar-${collapsed ? 'hidden' : 'visible'}`;

  return (
    <div className={getClassNames('app')}>
      <Sidebar className={getClassNames('app__sidebar')} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={getClassNames('app__content')}>{props.children}</div>
    </div>
  );
}



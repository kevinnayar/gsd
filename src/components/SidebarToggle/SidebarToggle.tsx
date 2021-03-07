import * as React from 'react';
import { useState } from 'react';
import Icon from '../Icon/Icon';

const visible = 'sidebar--visible';
const hidden = 'sidebar--hidden';

document.body.classList.add(visible);

function SidebarToggle() {
  const [vis, setVis] = useState(visible);

  const handleOnClick = () => {
    const newVis = vis === visible ? hidden : visible;
    document.body.classList.replace(vis, newVis);
    setVis(newVis);
  }

  const iconName = vis === visible ? 'center_focus_strong' : 'list';

  return (
    <div className="sidebar-toggle" onClick={handleOnClick}>
      <Icon iconName={iconName} className="sidebar-toggle" />
      <p>{vis === visible ? 'Focus Mode' : 'Show Sidebar'}</p>
    </div>
  );
}

export default React.memo(SidebarToggle);



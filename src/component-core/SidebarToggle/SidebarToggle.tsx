import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';

const visible = 'sidebar--visible';
const hidden = 'sidebar--hidden';

document.body.classList.add(visible);

export const SidebarToggle = React.memo(() => {
  const [vis, setVis] = useState(visible);

  const handleOnClick = () => {
    const newVis = vis === visible ? hidden : visible;
    document.body.classList.replace(vis, newVis);
    setVis(newVis);
  }

  const iconName = vis === visible ? 'keyboard_arrow_left' : 'keyboard_arrow_right';

  return (
    <div className="sidebar-toggle">
      <Icon iconName={iconName} className="sidebar-toggle" onClick={handleOnClick} />
    </div>
  );
});



import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import { initSidebarVisibility } from '../../utils/baseUtils';
import { SidebarVisibility } from '../../types/baseTypes';

const initVis = initSidebarVisibility();

export const SidebarToggle = React.memo(() => {
  const [vis, setVis] = useState<SidebarVisibility>(initVis);

  const handleOnClick = () => {
    const newVis = vis === 'sidebar-visible' ? 'sidebar-hidden' : 'sidebar-visible';
    document.body.classList.remove(vis);
    document.body.classList.add(newVis);
    setVis(newVis);
  }

  const iconName = vis === 'sidebar-visible' ? 'keyboard_arrow_left' : 'keyboard_arrow_right';

  return (
    <div className={`sidebar-toggle sidebar-toggle--${vis}`}>
      <Icon iconName={iconName} className="sidebar-toggle" onClick={handleOnClick} />
    </div>
  );
});



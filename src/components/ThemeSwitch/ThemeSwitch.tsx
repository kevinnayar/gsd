import * as React from 'react';
import { useState } from 'react';

export function ThemeSwitch() {
  const [colorMode, setColorMode] = useState<'light'|'dark'>('light');

  const handleOnChange = (e: any) => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    document.body.classList.remove(colorMode);
    document.body.classList.add(newColorMode);
    setColorMode(newColorMode);
  }

  return (
    <div className={`theme-switch theme-switch--${colorMode}`}>
      <label className="theme-switch__label" htmlFor="themeSwitchCheckbox">
        <input className="theme-switch__checkbox" type="checkbox" id="themeSwitchCheckbox" onChange={handleOnChange} />
        <div className="theme-switch__slider theme-switch__slider--round"></div>
      </label>
    </div>
  );
}



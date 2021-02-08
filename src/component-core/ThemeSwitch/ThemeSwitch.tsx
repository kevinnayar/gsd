import * as React from 'react';
import { useState } from 'react';
import { initLocalTheme, setLocalTheme } from '../../utils/baseUtils';
import { IThemeMode } from '../../types/baseTypes';

export const ThemeSwitch = React.memo(() => {
  const [theme, setTheme] = useState<IThemeMode>(initLocalTheme(window.localStorage));

  const handleOnChange = () => {
    const newTheme = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    setLocalTheme(window.localStorage, newTheme);
  }

  return (
    <div className={`theme-switch theme-switch--${theme}`}>
      <label className="theme-switch__label" htmlFor="themeSwitchCheckbox">
        <input className="theme-switch__checkbox" type="checkbox" id="themeSwitchCheckbox" onChange={handleOnChange} />
        <div className="theme-switch__slider theme-switch__slider--round"></div>
      </label>
    </div>
  );
});



import * as React from 'react';
import { useState } from 'react';
import { setLocalTheme } from '../../../utils/baseUtils';
import { IThemeMode } from '../../../types/baseTypes';

export function ThemeSwitch(props: { themeMode: IThemeMode }) {
  const [themeMode, setThemeMode] = useState<IThemeMode>(props.themeMode);

  const handleOnChange = (e: any) => {
    const newThemeMode = themeMode === 'light-mode' ? 'dark-mode' : 'light-mode';
    document.body.classList.remove(themeMode);
    document.body.classList.add(newThemeMode);
    setThemeMode(newThemeMode);
    setLocalTheme(window.localStorage, newThemeMode);
  }

  return (
    <div className={`theme-switch theme-switch--${themeMode}`}>
      <label className="theme-switch__label" htmlFor="themeSwitchCheckbox">
        <input className="theme-switch__checkbox" type="checkbox" id="themeSwitchCheckbox" onChange={handleOnChange} />
        <div className="theme-switch__slider theme-switch__slider--round"></div>
      </label>
    </div>
  );
}



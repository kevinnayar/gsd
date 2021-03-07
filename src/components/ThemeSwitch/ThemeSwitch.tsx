import * as React from 'react';
import { useState } from 'react';
import { initLocalTheme, setLocalTheme } from '../../utils/baseUtils';
import { IThemeMode } from '../../types/baseTypes';

function ThemeSwitch() {
  const [theme, setTheme] = useState<IThemeMode>(initLocalTheme(window.localStorage));

  const handleOnChange = () => {
    const newTheme = theme === 'mode--light' ? 'mode--dark' : 'mode--light';
    document.body.classList.replace(theme, newTheme);
    setTheme(newTheme);
    setLocalTheme(window.localStorage, newTheme);
  }

  return (
    <div className={`theme-switch theme-switch--${theme}`}>
      <p className="theme-switch__text begin" onClick={() => { if (theme === 'mode--dark') handleOnChange() }}>Light</p>
      <label className="theme-switch__label" htmlFor="themeSwitchCheckbox">
        <input className="theme-switch__checkbox" type="checkbox" id="themeSwitchCheckbox" onChange={handleOnChange} />
        <div className="theme-switch__slider theme-switch__slider--round"></div>
      </label>
      <p className="theme-switch__text end" onClick={() => { if (theme === 'mode--light') handleOnChange() }}>Dark</p>
    </div>
  );
}

export default React.memo(ThemeSwitch);




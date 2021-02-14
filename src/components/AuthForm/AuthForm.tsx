import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const AuthForm = React.memo((props: { children: any, hideNav?: boolean }) => {
  return (
    <div className="auth-form">
      {!props.hideNav && (
        <div className="auth-form__nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      )}
      {props.children}
    </div>
  );
});

import * as React from 'react';
import { NavLink } from 'react-router-dom';

function AuthForm(props: { children: any, showNav?: boolean }) {
  return (
    <div className="auth-form">
      {props.showNav && (
        <div className="auth-form__nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default React.memo(AuthForm);

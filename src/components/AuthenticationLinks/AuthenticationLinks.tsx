import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { UserDef } from '../../../types/authTypes';

type AuthenticationLinksProps = {
  userDef: null | UserDef;
  logout: () => void;
};

export function AuthenticationLinks(props: AuthenticationLinksProps) {
  return (
    <div className="authentication-links">
      {props.userDef
        ? (
          <>
            <Link
              className="authentication-links__link"
              to=""
              onClick={() => {
                props.logout();
              }}
            >
              <Icon iconName="lock" className="user-logout" />
              <p>Logout <span>({props.userDef.displayName})</span></p>
            </Link>
          </>
        ): (
          <>
            <Link className="authentication-links__link" to="/login">
              <Icon iconName="lock" className="user-login" />
              <p>Login</p>
            </Link>
            <Link className="authentication-links__link" to="/signup">
              <Icon iconName="person_add" className="user-register" />
              <p>Signup</p>
            </Link>
          </>
        )}
    </div>
  );
}



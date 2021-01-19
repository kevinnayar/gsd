import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../app';
import { Icon } from '../Icon/Icon';
import { logout } from '../../../utils/authUtils';

export function AuthenticationLinks() {
  const userAuthContext = useContext(UserAuthContext);

  return (
    <div className="authentication-links">
      {userAuthContext.userDef
        ? (
          <>
            <Link className="authentication-links__link" to="" onClick={() => logout(userAuthContext.auth)}>
              <Icon iconName="lock" className="user-logout" onClick={() => {}} />
              <p>Logout</p>
              <p><em>(Logged in as {userAuthContext.userDef.displayName})</em></p>
            </Link>
          </>
        ): (
          <>
            <Link className="authentication-links__link" to="/login">
              <Icon iconName="lock" className="user-login" onClick={() => {}} />
              <p>Login</p>
            </Link>
            <Link className="authentication-links__link" to="/signup">
              <Icon iconName="person_add" className="user-register" onClick={() => {}} />
              <p>Signup</p>
            </Link>
          </>
        )}
    </div>
  );
}



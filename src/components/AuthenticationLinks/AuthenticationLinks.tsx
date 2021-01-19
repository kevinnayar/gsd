import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../app';
import { Icon } from '../Icon/Icon';
import { logout } from '../../../utils/authUtils';

export function AuthenticationLinks() {
  const [userAuthContext, setUserAuthContext] = useContext(UserAuthContext);

  return (
    <div className="authentication-links">
      {userAuthContext.userDef
        ? (
          <>
            <Link
              className="authentication-links__link"
              to=""
              onClick={async () => {
                await logout(userAuthContext.auth);
                setUserAuthContext({ ...userAuthContext, userDef: undefined });
              }}
            >
              <Icon iconName="lock" className="user-logout" />
              <p>Logout <span>({userAuthContext.userDef.displayName})</span></p>
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



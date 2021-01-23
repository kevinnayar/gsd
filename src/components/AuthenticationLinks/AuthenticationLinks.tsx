import * as React from 'react';
import { useContext } from 'react';
import UserAuthContext from '../../context/userAuthContext';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { logout } from '../../../utils/authUtils';

export function AuthenticationLinks() {
  const [userAuth, setUserAuth] = useContext(UserAuthContext);

  return (
    <div className="authentication-links">
      {userAuth.userDef
        ? (
          <>
            <Link
              className="authentication-links__link"
              to=""
              onClick={async () => {
                await logout(userAuth.auth);
                setUserAuth({ ...userAuth, userDef: undefined });
              }}
            >
              <Icon iconName="lock" className="user-logout" />
              <p>Logout <span>({userAuth.userDef.displayName})</span></p>
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



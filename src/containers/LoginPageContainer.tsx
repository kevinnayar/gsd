import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { authLogin } from '../store/auth/authActions';
import { extractError, validateEmail, validatePassword } from '../utils/baseUtils';
import { InternalUserCredentials } from '../types/authTypes';
import { AppReducer } from '../types/baseTypes';

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { db, auth, userDef, authLoginXferStatus, redirectPathname } = useSelector((state: AppReducer) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (authLoginXferStatus.failed) {
      setError(extractError(authLoginXferStatus.error));
    }
  }, [authLoginXferStatus]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'email': {
        setEmail(evt.currentTarget.value);
        break;
      }
      case 'password': {
        setPassword(evt.currentTarget.value);
        break;
      }
      default: {
        setError(`Invalid field: ${evt.currentTarget.name || 'null'}`);
      }
    }
  }

  useEffect(() => {
    const valid = email && password && validateEmail(email) && validatePassword(password);
    setCanSubmit(valid);
  }, [email, password]);

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (email && password) {
        setError(null);
        const credentials: InternalUserCredentials = { email, password };
        dispatch(authLogin(db, auth, credentials));
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  useEffect(() => {
    if (userDef) {
      const pathname = redirectPathname || '/tasks';
      history.push(pathname);
    }
  }, [userDef]);
  
  return (
    <div className="auth-form auth-form--login">
      <div className="auth-form__nav-links">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>

      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input value={email} name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Login</button>
        </div>
      </form>
    </div>
  );
}

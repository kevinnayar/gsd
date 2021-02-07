import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { authSignup } from '../store/auth/authActions';
import { extractError, validateEmail, validatePassword } from '../utils/baseUtils';
import { UserDefPartial } from '../types/authTypes';
import { AppReducer } from '../types/baseTypes';


export default function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { db, auth, userDef, authSignupXferStatus, redirectPathname } = useSelector((state: AppReducer) => state.auth);

  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (authSignupXferStatus.failed) {
      setError(extractError(authSignupXferStatus.error));
    }
  }, [authSignupXferStatus]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'fullName': {
        setFullName(evt.currentTarget.value);
        break;
      }
      case 'displayName': {
        setDisplayName(evt.currentTarget.value);
        break;
      }
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
    const valid = fullName && displayName && email && password && validateEmail(email) && validatePassword(password);
    setCanSubmit(valid);
  }, [fullName, displayName, email, password]);

  const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (displayName && email && password) {
        setError(null);
        const userCredentials = { email, password };
        const userDefPartial: UserDefPartial = {
          email,
          fullName,
          displayName,
          type: 'user',
          roleType: 'basic',
        };
      
        dispatch(authSignup(db, auth, userCredentials, userDefPartial));
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
    <div className="auth-form auth-form--signup">
      <div className="auth-form__nav-links">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>

      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input value={fullName} name="fullName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="displayName">Display Name</label>
          <input value={displayName} name="displayName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input value={email} name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Signup</button>
        </div>
      </form>
    </div>
  );
}

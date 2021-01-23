import * as React from 'react';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import UserAuthContext from '../../context/userAuthContext';
import { errorObjectToString } from '../../../utils/baseUtils';
import { login, getUserDef } from '../../../utils/authUtils';
import { InternalUserCredentials, UserDefHydrated } from '../../../types/baseTypes';


export function Login() {
  const [userAuth, setUserAuth] = useContext(UserAuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

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

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (email && password) {
        setError(null);
        const credentials: InternalUserCredentials = { email, password };
        const user = await login(userAuth.auth, credentials);
        const userDef = await getUserDef(userAuth.db, user.uid) as UserDefHydrated;
        setUserAuth({ ...userAuth, userDef });
      }
    } catch (e) {
      setError(errorObjectToString(e));
    }
  }

  if (userAuth.userDef) return <Redirect to="/tasks" />;
  
  return (
    <div className="auth-form auth-form--login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
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
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}



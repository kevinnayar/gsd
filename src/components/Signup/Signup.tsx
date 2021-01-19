import * as React from 'react';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { UserAuthContext } from '../../app';
import { errorObjectToString } from '../../../utils/baseUtils';
import { signup } from '../../../utils/authUtils';
import { InternalUserDef } from '../../../types/baseTypes';

export function Signup() {
  const [userAuthContext, setUserAuthContext] = useContext(UserAuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
      case 'firstName': {
        setFirstName(evt.currentTarget.value);
        break;
      }
      case 'lastName': {
        setLastName(evt.currentTarget.value);
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

  const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (displayName && email && password) {
        setError(null);
        const user: InternalUserDef = {
          email,
          password,
          displayName,
          firstName,
          lastName,
          roleType: 'basic',
        };
        const userDef = await signup(userAuthContext.auth, userAuthContext.db, user);
        setUserAuthContext({ ...userAuthContext, userDef });
      }
    } catch (e) {
      setError(errorObjectToString(e));
    }
  }

  if (userAuthContext.userDef) return <Redirect to="/tasks" />;
  
  return (
    <div className="auth-form auth-form--signup">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input value={firstName} name="firstName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input value={lastName} name="lastName" onChange={handleChange} />
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
          <button>Signup</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}


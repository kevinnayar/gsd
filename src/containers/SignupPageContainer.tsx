import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import firebase from '../../config/firebase';
import { authSignup } from '../store/auth/authActions';
import { extractError } from '../../utils/baseUtils';
import { InternalUserCredentials, UserDefPartial, UserDef } from '../../types/authTypes';
import { AppReducer, ApiXferStatus } from '../../types/baseTypes';

type SignupProps = {
  db: firebase.firestore.Firestore,
  auth: firebase.auth.Auth,
  userDef: null | UserDef, 
  authSignupXferStatus: ApiXferStatus,
  authSignup: (
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
    userCredentials: InternalUserCredentials,
    userDefPartial: UserDefPartial,
  ) => void,
};

export function SignupPage(props: SignupProps) {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (props.authSignupXferStatus.failed) {
      setError(extractError(props.authSignupXferStatus.error));
    }
  }, [props.authSignupXferStatus]);

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
        authSignup
      
        props.authSignup(props.db, props.auth, userCredentials, userDefPartial);
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  if (props.userDef) return <Redirect to="/home" />;
  
  return (
    <div className="auth-form auth-form--signup">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
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
          <button>Signup</button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state: AppReducer) {
  return {
    db: state.auth.db,
    auth: state.auth.auth,
    userDef: state.auth.userDef,
    authSignupXferStatus: state.auth.authSignupXferStatus,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    authSignup: (
      db: firebase.firestore.Firestore,
      auth: firebase.auth.Auth,
      userCredentials: InternalUserCredentials,
      userDefPartial: UserDefPartial,
    ) => dispatch(authSignup(db, auth, userCredentials, userDefPartial)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);



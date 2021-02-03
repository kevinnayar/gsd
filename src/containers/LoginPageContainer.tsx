import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import firebase from '../../config/firebase';
import { authLogin } from '../store/auth/authActions';
import { extractError } from '../utils/baseUtils';
import { InternalUserCredentials, UserDef } from '../types/authTypes';
import { AppReducer, ApiXferStatus } from '../types/baseTypes';

type LoginProps = {
  db: firebase.firestore.Firestore,
  auth: firebase.auth.Auth,
  userDef: null | UserDef, 
  authLoginXferStatus: ApiXferStatus,
  authLogin: (
    db: firebase.firestore.Firestore,
    auth: firebase.auth.Auth,
    userCredentials: InternalUserCredentials
  ) => void,
};

export function LoginPage(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (props.authLoginXferStatus.failed) {
      setError(extractError(props.authLoginXferStatus.error));
    }
  }, [props.authLoginXferStatus]);

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
        props.authLogin(props.db, props.auth, credentials);
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  if (props.userDef) return <Redirect to="/tasks" />;
  
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

function mapStateToProps(state: AppReducer) {
  return {
    db: state.auth.db,
    auth: state.auth.auth,
    userDef: state.auth.userDef,
    authLoginXferStatus: state.auth.authLoginXferStatus,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    authLogin: (
      db: firebase.firestore.Firestore,
      auth: firebase.auth.Auth,
      userCredentials: InternalUserCredentials
    ) => dispatch(authLogin(db, auth, userCredentials)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);



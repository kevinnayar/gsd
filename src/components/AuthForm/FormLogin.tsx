import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogin, authSendPasswordResetEmail } from '../../store/auth/authActions';
import { extractError, validateEmail, validatePassword } from '../../utils/baseUtils';
import { InternalUserCredentials } from '../../types/authTypes';
import { AppReducer } from '../../types/baseTypes';

type View = 'LOGIN' | 'FORGOT_PASSWORD';

type ViewProps = {
  email: string,
  onChangeEmail: (email: string) => void,
  onChangeView: (view: View) => void,
};

function ForgotPassword(props: ViewProps) {
  const dispatch = useDispatch();
  const { authPasswordResetSendXferStatus } = useSelector((state: AppReducer) => state.auth);

  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      if (props.email) {
        setError(null);
        dispatch(authSendPasswordResetEmail(props.email));
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  useEffect(() => {
    if (authPasswordResetSendXferStatus.failed) {
      setError(extractError(authPasswordResetSendXferStatus.error));
    }
  }, [authPasswordResetSendXferStatus]);

  useEffect(() => {
    const valid = props.email && validateEmail(props.email);
    setCanSubmit(valid);
  }, [props.email]);

  if (authPasswordResetSendXferStatus.succeeded) {
    return (
      <div className="form--login">
        <div><p>Email sent to <strong>{props.email}</strong></p></div>
      </div>
    );
  }

  return (
    <div className="form--login">
      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={props.email}
            name="email"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.preventDefault();
              props.onChangeEmail(evt.currentTarget.value);
            }}
          />
        </div>
        <div>
          <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Reset Password</button>
        </div>
        <Link
          className="auth-form__switch-link"
          to=""
          onClick={(evt: any) => {
            evt.preventDefault();
            props.onChangeView('LOGIN');
          }}>
          Back to Login
        </Link>
      </form>
    </div>
  );
}

function Login(props: ViewProps) {
  const dispatch = useDispatch();
  const { authLoginXferStatus } = useSelector((state: AppReducer) => state.auth);

  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    switch (evt.currentTarget.name) {
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
      if (props.email && password) {
        setError(null);
        const userCredentials: InternalUserCredentials = { email: props.email, password };
        dispatch(authLogin(userCredentials));
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  useEffect(() => {
    if (authLoginXferStatus.failed) {
      setError(extractError(authLoginXferStatus.error));
    }
  }, [authLoginXferStatus]);

  useEffect(() => {
    const valid = props.email && password && validateEmail(props.email) && validatePassword(password);
    setCanSubmit(valid);
  }, [props.email, password]);
  
  return (
    <div className="form--login">
      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={props.email}
            name="email"
            onChange={(evt: any) => {
              evt.preventDefault();
              props.onChangeEmail(evt.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Let's Go!</button>
        </div>
        <Link
          className="auth-form__switch-link"
          to=""
          onClick={(evt: any) => {
            evt.preventDefault();
            props.onChangeView('FORGOT_PASSWORD');
          }}>
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

export function FormLogin() {
  const [email, setEmail] = useState('');
  const [view, setView] = useState('LOGIN');

  const props = { 
    email,
    onChangeEmail: setEmail,
    onChangeView: setView,
  };

  return view === 'LOGIN' ? <Login {...props} /> : <ForgotPassword {...props} />;
}



import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogin } from '../../store/auth/authActions';
import { extractError, validateEmail, validatePassword } from '../../utils/baseUtils';
import { InternalUserCredentials } from '../../types/authTypes';
import { AppReducer } from '../../types/baseTypes';

export function FormLogin() {
  const dispatch = useDispatch();
  const { authLoginXferStatus } = useSelector((state: AppReducer) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [canSubmit, setCanSubmit] = useState(false);

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
        const userCredentials: InternalUserCredentials = { email, password };
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
    const valid = email && password && validateEmail(email) && validatePassword(password);
    setCanSubmit(valid);
  }, [email, password]);
  
  return (
    <div className="form--login">
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

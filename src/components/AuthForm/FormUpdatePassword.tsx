import * as React from 'react';
import { auth } from '../../../config/firebase';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { authConfirmPasswordReset } from '../../store/auth/authActions';
import { extractError, validateEmail, validatePassword } from '../../utils/baseUtils';
import { UserDefPartial } from '../../types/authTypes';
import { AppReducer } from '../../types/baseTypes';

function useQuery() {
  const query: any = new URLSearchParams(useLocation().search);

  function getFromList(keys: string[]) {
    const values = [];
    for (let key of keys) {
      const value = query.get(key);
      values.push(value);
    }
    return values;
  }

  query.getFromList = getFromList;

  return query;
}

export function FormUpdatePassword() {
  const history = useHistory();
  const query = useQuery();
  const [mode, oobCode] = query.getFromList(['mode', 'oobCode']);
  
  const dispatch = useDispatch();
  const { authPasswordResetConfirmXferStatus } = useSelector((state: AppReducer) => state.auth);

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
      if (oobCode && password) {
        setError(null);
        dispatch(authConfirmPasswordReset(oobCode, password));
      }
    } catch (e) {
      setError(extractError(e));
    }
  }

  useEffect(() => {
    if (authPasswordResetConfirmXferStatus.failed) {
      setError(extractError(authPasswordResetConfirmXferStatus.error));
    }
    if (authPasswordResetConfirmXferStatus.succeeded) {
      history.push('/login');
    }
  }, [authPasswordResetConfirmXferStatus]);
  

  useEffect(() => {
    const valid = password && validatePassword(password);
    setCanSubmit(valid);
  }, [password]);

  return (
    <div className="form--signup">
      {error && <p className="auth-form__error">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button className={canSubmit ? 'btn' : 'btn btn--disabled'}>Update Password</button>
        </div>
      </form>
    </div>
  );
}


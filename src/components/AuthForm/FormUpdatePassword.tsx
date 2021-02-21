import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { authConfirmPasswordReset } from '../../store/auth/authActions';
import { extractError, validatePassword } from '../../utils/baseUtils';
import { AppReducer } from '../../types/baseTypes';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FormUpdatePassword() {
  const query = useQuery();
  const oobCode = query.get('oobCode');
  
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
  }, [authPasswordResetConfirmXferStatus]);
  

  useEffect(() => {
    const valid = password && validatePassword(password);
    setCanSubmit(valid);
  }, [password]);

  if (authPasswordResetConfirmXferStatus.succeeded) {
    return (
      <div className="form--login">
        <div>
          <p>Your password has been reset!</p>
          <Link
            className="auth-form__switch-link"
            to="/login"
            >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

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

export default React.memo(FormUpdatePassword);



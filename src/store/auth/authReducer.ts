import firebase from '../../../config/firebase';
import {
  apiXferInit,
  apiXferRequested,
  apiXferSucceeded,
  apiXferFailed,
} from '../../utils/baseUtils';
import {
  AUTH_CHECK_REQUESTED,
  AUTH_CHECK_SUCCEEDED,
  AUTH_CHECK_FAILED,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_LOGOUT_FAILED,
  AUTH_SIGNUP_REQUESTED,
  AUTH_SIGNUP_SUCCEEDED,
  AUTH_SIGNUP_FAILED,
  AuthDispatch,
} from '../../types/authTypes';
import { AuthReducer } from '../../types/baseTypes';

const initialState: AuthReducer = {
  authCheckXferStatus: apiXferInit(),
  authLoginXferStatus: apiXferInit(),
  authLogoutXferStatus: apiXferInit(),
  authSignupXferStatus: apiXferInit(),
  userDef: null,
  db: firebase.firestore(),
  auth: firebase.auth(),
};

export default function reducer(state: AuthReducer = initialState, action: AuthDispatch): AuthReducer {
  switch (action.type) {
    case AUTH_CHECK_REQUESTED:
      return { ...state, authCheckXferStatus: apiXferRequested() };
    case AUTH_CHECK_SUCCEEDED: {
      return {
        ...state,
        authCheckXferStatus: apiXferSucceeded(),
        userDef: action.payload,
      };
    }
    case AUTH_CHECK_FAILED:
      return { ...state, authCheckXferStatus: apiXferFailed(action.error) };

    case AUTH_LOGIN_REQUESTED:
      return { ...state, authLoginXferStatus: apiXferRequested() };
    case AUTH_LOGIN_SUCCEEDED: {
      return {
        ...state,
        authLoginXferStatus: apiXferSucceeded(),
        userDef: action.payload,
      };
    }
    case AUTH_LOGIN_FAILED:
      return { ...state, authLoginXferStatus: apiXferFailed(action.error) };

    case AUTH_LOGOUT_REQUESTED:
      return { ...state, authLogoutXferStatus: apiXferRequested() };
    case AUTH_LOGOUT_SUCCEEDED: {
      return {
        ...state,
        authLogoutXferStatus: apiXferSucceeded(),
        userDef: action.payload,
      };
    }
    case AUTH_LOGOUT_FAILED:
      return { ...state, authLogoutXferStatus: apiXferFailed(action.error) };

    case AUTH_SIGNUP_REQUESTED:
      return { ...state, authSignupXferStatus: apiXferRequested() };
    case AUTH_SIGNUP_SUCCEEDED: {
      return {
        ...state,
        authSignupXferStatus: apiXferSucceeded(),
        userDef: action.payload,
      };
    }
    case AUTH_SIGNUP_FAILED:
      return { ...state, authSignupXferStatus: apiXferFailed(action.error) };

    // default
    default:
      return state;
  }
}





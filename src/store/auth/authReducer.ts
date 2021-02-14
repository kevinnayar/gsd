import {
  apiXferInit,
  reducerMiddlewareHelper,
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
  AUTH_SET_REDIRECT,
  AUTH_RESET_PASSWORD_SEND_REQUESTED,
  AUTH_RESET_PASSWORD_SEND_SUCCEEDED,
  AUTH_RESET_PASSWORD_SEND_FAILED,
  AUTH_RESET_PASSWORD_CONFIRM_REQUESTED,
  AUTH_RESET_PASSWORD_CONFIRM_SUCCEEDED,
  AUTH_RESET_PASSWORD_CONFIRM_FAILED,
} from '../../types/authTypes';
import { AuthReducer } from '../../types/baseTypes';

export const initialState: AuthReducer = {
  authCheckXferStatus: apiXferInit(),
  authLoginXferStatus: apiXferInit(),
  authLogoutXferStatus: apiXferInit(),
  authSignupXferStatus: apiXferInit(),
  authPasswordResetSendXferStatus: apiXferInit(),
  authPasswordResetConfirmXferStatus: apiXferInit(),
  userDef: null,
  redirectPathname: '/tasks',
};

export default function reducer(state: AuthReducer = initialState, action: AuthDispatch): AuthReducer {
  switch (action.type) {
    case AUTH_CHECK_REQUESTED:
    case AUTH_CHECK_SUCCEEDED:
    case AUTH_CHECK_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_CHECK',
        actionXferStatus: 'authCheckXferStatus',
        succeededState: {
          ...state,
          userDef: action.payload,
        },
      });
    }

    case AUTH_LOGIN_REQUESTED:
    case AUTH_LOGIN_SUCCEEDED:
    case AUTH_LOGIN_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_LOGIN',
        actionXferStatus: 'authLoginXferStatus',
        succeededState: {
          ...state,
          userDef: action.payload,
        },
      });
    }

    case AUTH_LOGOUT_REQUESTED:
    case AUTH_LOGOUT_SUCCEEDED:
    case AUTH_LOGOUT_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_LOGOUT',
        actionXferStatus: 'authLogoutXferStatus',
        succeededState: {
          ...state,
          userDef: action.payload,
        },
      });
    }

    case AUTH_SIGNUP_REQUESTED:
    case AUTH_SIGNUP_SUCCEEDED:
    case AUTH_SIGNUP_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_SIGNUP',
        actionXferStatus: 'authSignupXferStatus',
        succeededState: {
          ...state,
          userDef: action.payload,
        },
      });
    }

    case AUTH_SET_REDIRECT:
      return { ...state, redirectPathname: action.payload };

    case AUTH_RESET_PASSWORD_SEND_REQUESTED:
    case AUTH_RESET_PASSWORD_SEND_SUCCEEDED:
    case AUTH_RESET_PASSWORD_SEND_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_RESET_PASSWORD_SEND',
        actionXferStatus: 'authPasswordResetSendXferStatus',
        succeededState: { ...state },
      });
    }

    case AUTH_RESET_PASSWORD_CONFIRM_REQUESTED:
    case AUTH_RESET_PASSWORD_CONFIRM_SUCCEEDED:
    case AUTH_RESET_PASSWORD_CONFIRM_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'AUTH_RESET_PASSWORD_CONFIRM',
        actionXferStatus: 'authPasswordResetConfirmXferStatus',
        succeededState: { ...state },
      });
    }

    // default
    default:
      return state;
  }
}





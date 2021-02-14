import firebase from '../../config/firebase';
import { BaseDispatch } from './baseTypes';

export const AUTH_CHECK_REQUESTED = 'AUTH_CHECK_REQUESTED';
export const AUTH_CHECK_SUCCEEDED = 'AUTH_CHECK_SUCCEEDED';
export const AUTH_CHECK_FAILED = 'AUTH_CHECK_FAILED';

export const AUTH_LOGIN_REQUESTED = 'AUTH_LOGIN_REQUESTED';
export const AUTH_LOGIN_SUCCEEDED = 'AUTH_LOGIN_SUCCEEDED';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';

export const AUTH_LOGOUT_REQUESTED = 'AUTH_LOGOUT_REQUESTED';
export const AUTH_LOGOUT_SUCCEEDED = 'AUTH_LOGOUT_SUCCEEDED';
export const AUTH_LOGOUT_FAILED = 'AUTH_LOGOUT_FAILED';

export const AUTH_SIGNUP_REQUESTED = 'AUTH_SIGNUP_REQUESTED';
export const AUTH_SIGNUP_SUCCEEDED = 'AUTH_SIGNUP_SUCCEEDED';
export const AUTH_SIGNUP_FAILED = 'AUTH_SIGNUP_FAILED';

export const AUTH_SET_REDIRECT = 'AUTH_SET_REDIRECT';

export const AUTH_RESET_PASSWORD_SEND_REQUESTED = 'AUTH_RESET_PASSWORD_SEND_REQUESTED';
export const AUTH_RESET_PASSWORD_SEND_SUCCEEDED = 'AUTH_RESET_PASSWORD_SEND_SUCCEEDED';
export const AUTH_RESET_PASSWORD_SEND_FAILED = 'AUTH_RESET_PASSWORD_SEND_FAILED';

export const AUTH_RESET_PASSWORD_CONFIRM_REQUESTED = 'AUTH_RESET_PASSWORD_CONFIRM_REQUESTED';
export const AUTH_RESET_PASSWORD_CONFIRM_SUCCEEDED = 'AUTH_RESET_PASSWORD_CONFIRM_SUCCEEDED';
export const AUTH_RESET_PASSWORD_CONFIRM_FAILED = 'AUTH_RESET_PASSWORD_CONFIRM_FAILED';

export type InternalUserCredentials = {
  email: string;
  password: string;
};

export type UserDefPartial = {
  email: string;
  fullName: string;
  displayName: string;
  type: 'user';
  roleType: 'basic' | 'premium' | 'super';
};

export type UserDef = UserDefPartial & {
  userId: string;
  createdAt: firebase.firestore.Timestamp;
  // acceptedTerms: boolean;
};

export type AuthDispatch = BaseDispatch & {
  type:
    | typeof AUTH_CHECK_REQUESTED
    | typeof AUTH_CHECK_SUCCEEDED
    | typeof AUTH_CHECK_FAILED
    | typeof AUTH_LOGIN_REQUESTED
    | typeof AUTH_LOGIN_SUCCEEDED
    | typeof AUTH_LOGIN_FAILED
    | typeof AUTH_LOGOUT_REQUESTED
    | typeof AUTH_LOGOUT_SUCCEEDED
    | typeof AUTH_LOGOUT_FAILED
    | typeof AUTH_SIGNUP_REQUESTED
    | typeof AUTH_SIGNUP_SUCCEEDED
    | typeof AUTH_SIGNUP_FAILED
    | typeof AUTH_SET_REDIRECT
    | typeof AUTH_RESET_PASSWORD_SEND_REQUESTED
    | typeof AUTH_RESET_PASSWORD_SEND_SUCCEEDED
    | typeof AUTH_RESET_PASSWORD_SEND_FAILED
    | typeof AUTH_RESET_PASSWORD_CONFIRM_REQUESTED
    | typeof AUTH_RESET_PASSWORD_CONFIRM_SUCCEEDED
    | typeof AUTH_RESET_PASSWORD_CONFIRM_FAILED
};


import firebase from '../config/firebase';
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

export type AuthCheckDispatch = BaseDispatch & {
  type:
    | typeof AUTH_CHECK_REQUESTED
    | typeof AUTH_CHECK_SUCCEEDED
    | typeof AUTH_CHECK_FAILED;
};

export type AuthLoginDispatch = BaseDispatch & {
  type: 
    | typeof AUTH_LOGIN_REQUESTED
    | typeof AUTH_LOGIN_SUCCEEDED
    | typeof AUTH_LOGIN_FAILED;
};
export type AuthLogoutDispatch = BaseDispatch & {
  type:
    | typeof AUTH_LOGOUT_REQUESTED
    | typeof AUTH_LOGOUT_SUCCEEDED
    | typeof AUTH_LOGOUT_FAILED;
};
export type AuthSignupDispatch = BaseDispatch & {
  type:
    | typeof AUTH_SIGNUP_REQUESTED
    | typeof AUTH_SIGNUP_SUCCEEDED
    | typeof AUTH_SIGNUP_FAILED;
};

export type AuthDispatch =
  | AuthCheckDispatch
  | AuthLoginDispatch
  | AuthLogoutDispatch
  | AuthSignupDispatch;

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
};
import firebase, { auth, db } from '../../../config/firebase';
import {
  UserDef,
  UserDefPartial,
  InternalUserCredentials,
  AuthLoginDispatch,
  AuthLogoutDispatch,
  AuthSignupDispatch,
  AuthCheckDispatch,
  AuthRedirectDispatch,
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
  AUTH_SET_REDIRECT,
} from '../../types/authTypes';

async function asyncUserCreateDef(user: firebase.User, userDefPartial: UserDefPartial): Promise<UserDef> {
  const { email, fullName, displayName, roleType, type } = userDefPartial;
  const userDef: UserDef = {
    email,
    fullName,
    displayName,
    roleType,
    type,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    userId: user.uid,
  };
  await user.updateProfile({ displayName: userDef.displayName });
  await db.collection('users').doc(userDef.userId).set(userDef);
  return userDef;
}

async function asyncUserSignup(userCredentials: InternalUserCredentials): Promise<firebase.User> {
  const userCredential: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(
    userCredentials.email,
    userCredentials.password,
  );
  if (!userCredential.user) throw new Error('Could not create user');
  return userCredential.user;
}

async function asyncUserGetDef(userId: string): Promise<void | UserDef> {
  const userRef = db.collection('users').doc(userId);
  const userDef = await userRef.get().then((userSnapshot) => {
    if (userSnapshot.exists) return userSnapshot.data();
  });
  return userDef as void | UserDef;
}

async function asyncUserLogin(credentials: InternalUserCredentials): Promise<firebase.User> {
  const { email, password } = credentials;
  const userCredential: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential.user;
}

async function asyncUserLogout() {
  await auth.signOut();
}

async function asyncUserCheck(): Promise<void | firebase.User> {
  const user: void | firebase.User = auth.currentUser;
  if (user) return user;

  return new Promise(resolve => {
    auth.onAuthStateChanged(_user => {
      resolve(_user ? _user : undefined);
    });
  });
}

export function authSignup(userCredentials: InternalUserCredentials, userDefPartial: UserDefPartial) {
  return async (dispatch: (action: AuthSignupDispatch) => void) => {
    dispatch({
      type: AUTH_SIGNUP_REQUESTED,
    });

    try {
      const user = await asyncUserSignup(userCredentials);
      const payload = await asyncUserCreateDef(user, userDefPartial); 
      dispatch({
        type: AUTH_SIGNUP_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: AUTH_SIGNUP_FAILED,
        error,
      });
    }
  };
}

export function authLogin(userCredentials: InternalUserCredentials) {
  return async (dispatch: (action: AuthLoginDispatch) => void) => {
    dispatch({
      type: AUTH_LOGIN_REQUESTED,
    });

    try {
      const user = await asyncUserLogin(userCredentials);
      const payload = await asyncUserGetDef(user.uid);
      dispatch({
        type: AUTH_LOGIN_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILED,
        error,
      });
    }
  };
}

export function authLogout() {
  return async (dispatch: (action: AuthLogoutDispatch) => void) => {
    dispatch({
      type: AUTH_LOGOUT_REQUESTED,
    });

    try {
      await asyncUserLogout();
      dispatch({
        type: AUTH_LOGOUT_SUCCEEDED,
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGOUT_FAILED,
        error,
      });
    }
  };
}

export function authCheck() {
  return async (dispatch: (action: AuthCheckDispatch) => void) => {
    dispatch({
      type: AUTH_CHECK_REQUESTED,
    });

    try {
      const user = await asyncUserCheck();
      const payload = user ? await asyncUserGetDef(user.uid) : undefined;
      dispatch({
        type: AUTH_CHECK_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: AUTH_CHECK_FAILED,
        error,
      });
    }
  };
}

export function authSetRedirect(pathname: string) {
  return (dispatch: (action: AuthRedirectDispatch) => void) => {
    dispatch({
      type: AUTH_SET_REDIRECT,
      payload: pathname,
    });
  };
}


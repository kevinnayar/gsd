import firebase from '../../../config/firebase';
import {
  UserDef,
  UserDefPartial,
  InternalUserCredentials,
  AuthLoginDispatch,
  AuthLogoutDispatch,
  AuthSignupDispatch,
  AuthCheckDispatch,
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
} from '../../types/authTypes';

async function asyncUserCreateDef(
  db: firebase.firestore.Firestore, 
  user: firebase.User, 
  userDefPartial: UserDefPartial
): Promise<UserDef> {
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

async function asyncUserSignup(
  auth: firebase.auth.Auth,
  userCredentials: InternalUserCredentials,
): Promise<firebase.User> {
  const userCredential: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(
    userCredentials.email,
    userCredentials.password,
  );
  if (!userCredential.user) throw new Error('Could not create user');
  return userCredential.user;
}

async function asyncUserGetDef(db: firebase.firestore.Firestore, userId: string): Promise<void | UserDef> {
  const userRef = db.collection('users').doc(userId);
  const userDef = await userRef.get().then((userSnapshot) => {
    if (userSnapshot.exists) return userSnapshot.data();
  });
  return userDef as void | UserDef;
}

async function asyncUserLogin(auth: firebase.auth.Auth, credentials: InternalUserCredentials): Promise<firebase.User> {
  const { email, password } = credentials;
  const userCredential: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential.user;
}

async function asyncUserLogout(auth: firebase.auth.Auth) {
  await auth.signOut();
}

async function asyncUserCheck(auth: firebase.auth.Auth): Promise<void | firebase.User> {
  const user: void | firebase.User = auth.currentUser;
  if (user) return user;

  return new Promise(resolve => {
    auth.onAuthStateChanged(_user => {
      resolve(_user ? _user : undefined);
    });
  });
}

export function authSignup(
  db: firebase.firestore.Firestore,
  auth: firebase.auth.Auth,
  userCredentials: InternalUserCredentials,
  userDefPartial: UserDefPartial,
) {
  return async (dispatch: (action: AuthSignupDispatch) => void) => {
    dispatch({
      type: AUTH_SIGNUP_REQUESTED,
    });

    try {
      const user = await asyncUserSignup(auth, userCredentials);
      const payload = await asyncUserCreateDef(db, user, userDefPartial); 
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

export function authLogin(
  db: firebase.firestore.Firestore,
  auth: firebase.auth.Auth,
  userCredentials: InternalUserCredentials,
) {
  return async (dispatch: (action: AuthLoginDispatch) => void) => {
    dispatch({
      type: AUTH_LOGIN_REQUESTED,
    });

    try {
      const user = await asyncUserLogin(auth, userCredentials);
      const payload = await asyncUserGetDef(db, user.uid);
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

export function authLogout(auth: firebase.auth.Auth) {
  return async (dispatch: (action: AuthLogoutDispatch) => void) => {
    dispatch({
      type: AUTH_LOGOUT_REQUESTED,
    });

    try {
      await asyncUserLogout(auth);
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

export function authCheck(db: firebase.firestore.Firestore, auth: firebase.auth.Auth) {
  return async (dispatch: (action: AuthCheckDispatch) => void) => {
    dispatch({
      type: AUTH_CHECK_REQUESTED,
    });

    try {
      const user = await asyncUserCheck(auth);
      const payload = user ? await asyncUserGetDef(db, user.uid) : undefined;
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

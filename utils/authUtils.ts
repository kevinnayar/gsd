import firebase from '../config/firebase';
import { InternalUserCredentials, InternalUserDef, UserDefHydrated } from '../types/baseTypes';

export async function getUserDef(
  db: firebase.firestore.Firestore,
  userId: string
): Promise<void | UserDefHydrated> {
  const userRef = db.collection('users').doc(userId);
  const userDef = await userRef.get().then((userSnapshot) => {
    if (userSnapshot.exists) return userSnapshot.data();
  });
  return userDef as void | UserDefHydrated;
}

export async function signup(
  auth: firebase.auth.Auth,
  db: firebase.firestore.Firestore,
  userDef: InternalUserDef,
): Promise<UserDefHydrated> {
  const { email, password } = userDef;
  const userCredential: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(email, password);
  if (!userCredential.user) throw new Error('Could not create user');

  const userDefHydrated: UserDefHydrated = {
    email,
    firstName: userDef.firstName,
    lastName: userDef.lastName,
    displayName: userDef.displayName,
    roleType: userDef.roleType,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    userId: userCredential.user.uid,
  };
  await userCredential.user.updateProfile({ displayName: userDefHydrated.displayName });
  await db.collection('users').doc(userDefHydrated.userId).set(userDefHydrated);
  return userDefHydrated;
}

export async function login(
  auth: firebase.auth.Auth,
  credentials: InternalUserCredentials
): Promise<firebase.User> {
  const { email, password } = credentials;
  const userCredential: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential.user;
}

export async function logout(auth: firebase.auth.Auth) {
  await auth.signOut();
}



import firebase from '../config/firebase';
import {
  InternalUserCredentials,
  InternalUserDef,
  UserDefHydrated,
} from '../types/baseTypes';

// async function handleSignUpAsync(newUser: InternalUserDef): Promise<firebase.auth.UserCredential> {
//   const { email, password, firstName, lastName, displayName, roleType } = newUser;

//   const credential: firebase.auth.UserCredential = await firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(async (userCredential: firebase.auth.UserCredential) => {
//       const userId: string = userCredential.user ? userCredential.user.uid : `USER_UID_ERROR_${new Date().getTime()}`;
//       const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
//       const userDef: UserDefHydrated = {
//         firstName,
//         lastName,
//         displayName,
//         email: email.toLowerCase(),
//         userId,
//         roleType,
//         createdAt,
//       };

//       await firebase.firestore().collection('users').doc(userId).set(userDef);
//       return userCredential;
//     });
//   return credential;
// }

// async function handleLogInAsync(userCredentials: InternalUserCredentials): Promise<firebase.auth.UserCredential> {
//   const result: firebase.auth.UserCredential = await firebase
//     .auth()
//     .signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
//   return result;
// }

// async function handleLogOutAsync(): Promise<void> {
//   const result: void = await firebase.auth().signOut();
//   return result;
// }

// async function handleGetUserAsync(userId: string): Promise<void | firebase.firestore.DocumentData> {
//   const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase
//     .firestore()
//     .collection('users')
//     .doc(userId);

//   const userDoc: void | firebase.firestore.DocumentData = await userRef
//     .get()
//     .then((userSnapshot: firebase.firestore.DocumentSnapshot) => {
//       if (userSnapshot.exists) {
//         return userSnapshot.data();
//       } else {
//         throw new Error('Could not get user data.');
//       }
//     });
//   return userDoc;
// }

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



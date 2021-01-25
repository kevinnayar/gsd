import firebase from '../config/firebase';
import { UserDef, AuthDispatch } from './authTypes';
import { TaskMap, TasksDispatch } from './taskTypes';

export type IThemeMode = 'light-mode' | 'dark-mode';

export type ColumnId = 'incomplete' | 'complete';

export type ApiXferStatus = {
  requested: boolean;
  succeeded: boolean;
  failed: boolean;
  error: null | string;
};

export type BaseDispatch = {
  payload?: any;
  error?: any;
};

export type AuthReducer = {
  authCheckXferStatus: ApiXferStatus;
  authLoginXferStatus: ApiXferStatus;
  authLogoutXferStatus: ApiXferStatus;
  authSignupXferStatus: ApiXferStatus;
  userDef: null | UserDef;
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
};

export type TasksReducer = {
  taskAddXferStatus: ApiXferStatus;
  taskUpdateXferStatus: ApiXferStatus;
  taskRemoveXferStatus: ApiXferStatus;
  tasksMap: null | TaskMap;
};

export type AppReducer = {
  auth: AuthReducer;
  tasks: TasksReducer;
};

export type AppDispatch = AuthDispatch | TasksDispatch;







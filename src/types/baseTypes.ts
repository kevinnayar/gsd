import firebase from '../../config/firebase';
import { UserDef, AuthDispatch } from './authTypes';
import { TaskMap, TasksDispatch } from './taskTypes';
import { TaskDocMap } from './taskDocTypes';

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
  taskGetAllXferStatus: ApiXferStatus;
  taskAddXferStatus: ApiXferStatus;
  taskUpdateXferStatus: ApiXferStatus;
  taskRemoveXferStatus: ApiXferStatus;
  taskMap: null | TaskMap;
};

export type TaskDocsReducer = {
  taskDocGetXferStatus: ApiXferStatus;
  taskDocAddXferStatus: ApiXferStatus;
  taskDocUpdateXferStatus: ApiXferStatus;
  taskDocRemoveXferStatus: ApiXferStatus;
  blobs: null | TaskDocMap;
};

export type AppReducer = {
  auth: AuthReducer;
  tasks: TasksReducer;
  taskDocs: TaskDocsReducer;
};

export type AppDispatch = AuthDispatch | TasksDispatch;







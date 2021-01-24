import firebase from '../config/firebase';

export type InternalUserCredentials = {
  email: string;
  password: string;
};

type UserAccountType = 'basic' | 'premium' | 'super';

export type UserDef = {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  roleType: UserAccountType;
};

export type InternalUserDef = InternalUserCredentials & UserDef;

export type UserDefHydrated = UserDef & {
  userId: string;
  createdAt: firebase.firestore.Timestamp;
};

export type IUserAuthContext = {
  userDef: void | UserDefHydrated;
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
};

export type IThemeMode = 'light-mode' | 'dark-mode';

export type ColumnId = 'incomplete' | 'complete';

export type ITaskItem = {
  taskId: string;
  userId: string;
  name: string;
  type: 'task';
  completed: boolean;
  createdDate: number;
};

export type ITaskMap = { [id: string]: ITaskItem };

export type ITaskData = {
  taskMap: ITaskMap;
  taskIds: string[];
};

export type IUserTasksContext = void | {
  completeTasks: ITaskData;
  incompleteTasks: ITaskData;
};





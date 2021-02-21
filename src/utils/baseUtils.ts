import * as uuid from 'uuid';
import firebase from '../../config/firebase';
import { RawDraftContentState } from 'draft-js';
import { IThemeMode, ApiXferStatus, BaseDispatch } from '../types/baseTypes';
import { ITaskItem } from '../types/taskTypes';
import { TaskDoc } from '../types/taskDocTypes';

export function extractError(error: string | { message: string }, fallback?: string): string {
  let result = fallback || 'There was an error. Please try again later.';

  if (typeof error === 'string') result = error;
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    result = error.message;
  }

  return result;
}

export function isMobileDevice(): boolean {
  const ver = window.navigator.appVersion;
  if (!ver) return false;
  return Boolean(
    ver.match(/iPhone/) || ver.match(/iPad/) || ver.match(/Android/)
  );
}

export function moveItemInList<T>(listIn: T[], from: number, _to: number): T[] {
  const to = from < _to ? _to - 1 : _to;

  if (from === to) return listIn;

  const listOut: T[] = [];

  listIn.forEach((item, index) => {
    if (from < to) {
      if (index < from) listOut[index] = item;
      if (index === from) listOut[to] = item;
      if (index > from && index <= to) listOut[index - 1] = item;
      if (index > to) listOut[index] = item;
    } else if (from > to) {
      if (index < to) listOut[index] = item;
      if (index >= to && index < from) listOut[index + 1] = item;
      if (index === from) listOut[to] = item;
      if (index > from) listOut[index] = item;
    }
  });

  return listOut;
}

export function getRandomInt(limit: number, floored?: boolean): number {
  const method = floored ? Math.floor : Math.ceil;
  return method(Math.random() * limit);
}

export function validateEmail(value: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

export function validatePassword(value: string): boolean {
  return value.length >= 8;
}

const GSD_THEME_KEY = 'GSD_THEME_KEY';
const DEFAULT_THEME_MODE: IThemeMode = 'mode--light';

function getLocalTheme(storage: Storage): IThemeMode {
  return storage.getItem && storage.getItem(GSD_THEME_KEY) !== null && storage.getItem(GSD_THEME_KEY) !== 'null'
    ? (storage.getItem(GSD_THEME_KEY) as IThemeMode)
    : DEFAULT_THEME_MODE;
}

export function setLocalTheme(storage: Storage, themeMode: IThemeMode) {
  if (storage.setItem) storage.setItem(GSD_THEME_KEY, themeMode);
}

export function initLocalTheme(storage: Storage): IThemeMode {
  const themeMode: IThemeMode = getLocalTheme(storage);
  document.body.classList.add(themeMode);
  setLocalTheme(storage, themeMode);
  return themeMode;
}

export function apiXferInit(): ApiXferStatus {
  return {
    requested: false,
    succeeded: false,
    failed: false,
    error: null,
  };
}

export function apiXferRequested(): ApiXferStatus {
  return {
    requested: true,
    succeeded: false,
    failed: false,
    error: null,
  };
}

export function apiXferSucceeded(): ApiXferStatus {
  return {
    requested: false,
    succeeded: true,
    failed: false,
    error: null,
  };
}

export function apiXferFailed(error: string | { message: string }): ApiXferStatus {
  return {
    requested: false,
    succeeded: false,
    failed: true,
    error: extractError(error),
  };
}

export function createTask(userId: string): ITaskItem {
  const createdDate = firebase.firestore.Timestamp.fromDate(new Date());
  const task: ITaskItem = {
    taskId: uuid.v4(),
    userId: userId,
    name: '',
    type: 'task',
    completed: false,
    createdDate,
  };
  return task;
}

export function createTaskDoc(task: ITaskItem): TaskDoc {
  const { taskId, userId } = task;
  const createdDate = firebase.firestore.Timestamp.fromDate(new Date());
  const taskDoc: TaskDoc = {
    taskId,
    userId,
    blob: { blocks: [], entityMap: {} },
    type: 'taskDoc',
    createdDate,
    updatedDate: createdDate,
  };
  return taskDoc;
}

export function updateTaskDoc(taskDocIn: TaskDoc, blob: RawDraftContentState): TaskDoc {
  const updatedDate = firebase.firestore.Timestamp.fromDate(new Date());
  const taskDoc: TaskDoc = {
    ...taskDocIn,
    blob,
    updatedDate,
  };
  return taskDoc;
}


type ActionMiddlewareConfig<T> = {
  actionTypePrefix: string;
  actionXferStatus: string;
  succeededState: T;
};

export function reducerMiddlewareHelper<T>(
  state: T,
  action: BaseDispatch & { type: string },
  config: ActionMiddlewareConfig<T>,
): T {
  if (action.type.startsWith(config.actionTypePrefix)) {
    if (action.type.includes('REQUESTED')) {
      return { ...state, [config.actionXferStatus]: apiXferRequested() };
    }

    if (action.type.includes('SUCCEEDED')) {
      return { ...config.succeededState, [config.actionXferStatus]: apiXferSucceeded() };
    }

    if (action.type.includes('FAILED')) {
      return { ...state, [config.actionXferStatus]: apiXferFailed(action.error) };
    }
  }

  return state;
}




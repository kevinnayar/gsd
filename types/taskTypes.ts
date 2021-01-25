import { BaseDispatch } from './baseTypes';

export const TASKS_GET_ALL_REQUESTED = 'TASKS_GET_ALL_REQUESTED';
export const TASKS_GET_ALL_SUCCEEDED = 'TASKS_GET_ALL_SUCCEEDED';
export const TASKS_GET_ALL_FAILED = 'TASKS_GET_ALL_FAILED';

export const TASK_ADD_REQUESTED = 'TASK_ADD_REQUESTED';
export const TASK_ADD_SUCCEEDED = 'TASK_ADD_SUCCEEDED';
export const TASK_ADD_FAILED = 'TASK_ADD_FAILED';

export const TASK_UPDATE_REQUESTED = 'TASK_UPDATE_REQUESTED';
export const TASK_UPDATE_SUCCEEDED = 'TASK_UPDATE_SUCCEEDED';
export const TASK_UPDATE_FAILED = 'TASK_UPDATE_FAILED';

export const TASKS_REMOVE_REQUESTED = 'TASKS_REMOVE_REQUESTED';
export const TASKS_REMOVE_SUCCEEDED = 'TASKS_REMOVE_SUCCEEDED';
export const TASKS_REMOVE_FAILED = 'TASKS_REMOVE_FAILED';

export type TaskGetAllDispatch = BaseDispatch & {
  type: typeof TASKS_GET_ALL_REQUESTED | typeof TASKS_GET_ALL_SUCCEEDED | typeof TASKS_GET_ALL_FAILED;
};

export type TaskAddDispatch = BaseDispatch & {
  type: typeof TASK_ADD_REQUESTED | typeof TASK_ADD_SUCCEEDED | typeof TASK_ADD_FAILED;
};

export type TaskUpdateDispatch = BaseDispatch & {
  type: typeof TASK_UPDATE_REQUESTED | typeof TASK_UPDATE_SUCCEEDED | typeof TASK_UPDATE_FAILED;
};
export type TaskRemoveDispatch = BaseDispatch & {
  type: typeof TASKS_REMOVE_REQUESTED | typeof TASKS_REMOVE_SUCCEEDED | typeof TASKS_REMOVE_FAILED;
};

export type TasksDispatch =
  | TaskGetAllDispatch
  | TaskAddDispatch
  | TaskUpdateDispatch
  | TaskRemoveDispatch;

type TaskItem = {
  taskId: string;
  userId: string;
  name: string;
  type: 'task';
  completed: boolean;
  createdDate: number;
};

export type TaskMap = { [id: string]: TaskItem };


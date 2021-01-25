import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../../utils/baseUtils';
import {
  TASKS_GET_ALL_REQUESTED,
  TASKS_GET_ALL_SUCCEEDED,
  TASKS_GET_ALL_FAILED,
  TASK_ADD_REQUESTED,
  TASK_ADD_SUCCEEDED,
  TASK_ADD_FAILED,
  TASK_UPDATE_REQUESTED,
  TASK_UPDATE_SUCCEEDED,
  TASK_UPDATE_FAILED,
  TASKS_REMOVE_REQUESTED,
  TASKS_REMOVE_SUCCEEDED,
  TASKS_REMOVE_FAILED,
  TasksDispatch,
} from '../../../types/taskTypes';
import { TasksReducer } from '../../../types/baseTypes';

const initialState: TasksReducer = {
  taskAddXferStatus: apiXferInit(),
  taskUpdateXferStatus: apiXferInit(),
  taskRemoveXferStatus: apiXferInit(),
  tasksMap: null,
};

export default function reducer(state: TasksReducer = initialState, action: TasksDispatch): TasksReducer {
  switch (action.type) {
    case TASKS_GET_ALL_REQUESTED:
      return { ...state, taskAddXferStatus: apiXferRequested() };
    case TASKS_GET_ALL_SUCCEEDED: {
      return {
        ...state,
        taskAddXferStatus: apiXferSucceeded(),
        tasksMap: action.payload,
      };
    }
    case TASKS_GET_ALL_FAILED:
      return { ...state, taskAddXferStatus: apiXferFailed(action.error) };

    case TASK_ADD_REQUESTED:
      return { ...state, taskAddXferStatus: apiXferRequested() };
    case TASK_ADD_SUCCEEDED: {
      return {
        ...state,
        taskAddXferStatus: apiXferSucceeded(),
        tasksMap: action.payload,
      };
    }
    case TASK_ADD_FAILED:
      return { ...state, taskAddXferStatus: apiXferFailed(action.error) };

    case TASK_UPDATE_REQUESTED:
      return { ...state, taskUpdateXferStatus: apiXferRequested() };
    case TASK_UPDATE_SUCCEEDED: {
      return {
        ...state,
        taskUpdateXferStatus: apiXferSucceeded(),
        tasksMap: action.payload,
      };
    }
    case TASK_UPDATE_FAILED:
      return { ...state, taskUpdateXferStatus: apiXferFailed(action.error) };

    case TASKS_REMOVE_REQUESTED:
      return { ...state, taskRemoveXferStatus: apiXferRequested() };
    case TASKS_REMOVE_SUCCEEDED: {
      return {
        ...state,
        taskRemoveXferStatus: apiXferSucceeded(),
        tasksMap: action.payload,
      };
    }
    case TASKS_REMOVE_FAILED:
      return { ...state, taskRemoveXferStatus: apiXferFailed(action.error) };

    // default
    default:
      return state;
  }
}

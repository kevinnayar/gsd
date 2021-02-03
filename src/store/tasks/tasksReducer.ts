import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../utils/baseUtils';
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
  TASK_REMOVE_REQUESTED,
  TASK_REMOVE_SUCCEEDED,
  TASK_REMOVE_FAILED,
  TasksDispatch,
} from '../../types/taskTypes';
import { TasksReducer } from '../../types/baseTypes';

const initialState: TasksReducer = {
  taskGetAllXferStatus: apiXferInit(),
  taskAddXferStatus: apiXferInit(),
  taskUpdateXferStatus: apiXferInit(),
  taskRemoveXferStatus: apiXferInit(),
  taskMap: null,
};

export default function reducer(state: TasksReducer = initialState, action: TasksDispatch): TasksReducer {
  switch (action.type) {
    case TASKS_GET_ALL_REQUESTED:
      return { ...state, taskGetAllXferStatus: apiXferRequested() };
    case TASKS_GET_ALL_SUCCEEDED: {
      return {
        ...state,
        taskGetAllXferStatus: apiXferSucceeded(),
        taskMap: action.payload,
      };
    }
    case TASKS_GET_ALL_FAILED:
      return { ...state, taskGetAllXferStatus: apiXferFailed(action.error) };

    case TASK_ADD_REQUESTED:
      return { ...state, taskAddXferStatus: apiXferRequested() };
    case TASK_ADD_SUCCEEDED: {
      return {
        ...state,
        taskAddXferStatus: apiXferSucceeded(),
        taskMap: {
          ...state.taskMap,
          ...action.payload,
        }
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
        taskMap: {
          ...state.taskMap,
          ...action.payload,
        },
      };
    }
    case TASK_UPDATE_FAILED:
      return { ...state, taskUpdateXferStatus: apiXferFailed(action.error) };

    case TASK_REMOVE_REQUESTED:
      return { ...state, taskRemoveXferStatus: apiXferRequested() };
    case TASK_REMOVE_SUCCEEDED: {
      const taskMap = { ...state.taskMap || {} } ;
      delete taskMap[action.payload];
      return {
        ...state,
        taskRemoveXferStatus: apiXferSucceeded(),
        taskMap,
      };
    }
    case TASK_REMOVE_FAILED:
      return { ...state, taskRemoveXferStatus: apiXferFailed(action.error) };

    // default
    default:
      return state;
  }
}

import { apiXferInit, reducerMiddlewareHelper } from '../../utils/baseUtils';
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

export const initialState: TasksReducer = {
  taskGetAllXferStatus: apiXferInit(),
  taskAddXferStatus: apiXferInit(),
  taskUpdateXferStatus: apiXferInit(),
  taskRemoveXferStatus: apiXferInit(),
  taskMap: null,
};

export default function reducer(state: TasksReducer = initialState, action: TasksDispatch): TasksReducer {
  switch (action.type) {
    case TASKS_GET_ALL_REQUESTED:
    case TASKS_GET_ALL_SUCCEEDED:
    case TASKS_GET_ALL_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASKS_GET_ALL',
        actionXferStatus: 'taskGetAllXferStatus',
        succeededState: { 
          ...state, 
          taskMap: action.payload,
        },
      });
    }

    case TASK_ADD_REQUESTED:
    case TASK_ADD_SUCCEEDED:
    case TASK_ADD_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASK_ADD',
        actionXferStatus: 'taskAddXferStatus',
        succeededState: {
          ...state,
          taskMap: {
            ...state.taskMap,
            ...action.payload,
          },
        },
      });
    }

    case TASK_UPDATE_REQUESTED:
    case TASK_UPDATE_SUCCEEDED:
    case TASK_UPDATE_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASK_UPDATE',
        actionXferStatus: 'taskUpdateXferStatus',
        succeededState: {
          ...state,
          taskMap: {
            ...state.taskMap,
            ...action.payload,
          },
        },
      });
    }

    case TASK_REMOVE_REQUESTED:
    case TASK_REMOVE_SUCCEEDED:
    case TASK_REMOVE_FAILED: {
      const taskMap = { ...(state.taskMap || {}) };
      delete taskMap[action.payload];
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASK_REMOVE',
        actionXferStatus: 'taskRemoveXferStatus',
        succeededState: {
          ...state,
          taskMap,
        },
      });
    }

    default:
      return state;
  }
}

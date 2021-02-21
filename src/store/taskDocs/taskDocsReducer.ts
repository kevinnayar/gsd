import { apiXferInit, reducerMiddlewareHelper } from '../../utils/baseUtils';
import {
  TASKDOC_GET_REQUESTED,
  TASKDOC_GET_SUCCEEDED,
  TASKDOC_GET_FAILED,
  TASKDOC_ADD_REQUESTED,
  TASKDOC_ADD_SUCCEEDED,
  TASKDOC_ADD_FAILED,
  TASKDOC_UPDATE_REQUESTED,
  TASKDOC_UPDATE_SUCCEEDED,
  TASKDOC_UPDATE_FAILED,
  TASKDOC_REMOVE_REQUESTED,
  TASKDOC_REMOVE_SUCCEEDED,
  TASKDOC_REMOVE_FAILED,
  TaskDocDispatch,
} from '../../types/taskDocTypes';
import { TaskDocsReducer } from '../../types/baseTypes';

export const initialState: TaskDocsReducer = {
  taskDocGetXferStatus: apiXferInit(),
  taskDocAddXferStatus: apiXferInit(),
  taskDocUpdateXferStatus: apiXferInit(),
  taskDocRemoveXferStatus: apiXferInit(),
  blobs: null,
};

export default function reducer(state: TaskDocsReducer = initialState, action: TaskDocDispatch): TaskDocsReducer {
  switch (action.type) {
    case TASKDOC_GET_REQUESTED:
    case TASKDOC_GET_SUCCEEDED:
    case TASKDOC_GET_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASKDOC_GET',
        actionXferStatus: 'taskDocGetXferStatus',
        succeededState: {
          ...state,
          blobs: {
            ...state.blobs,
            ...action.payload,
          },
        },
      });
    }

    case TASKDOC_ADD_REQUESTED:
    case TASKDOC_ADD_SUCCEEDED:
    case TASKDOC_ADD_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASKDOC_ADD',
        actionXferStatus: 'taskDocAddXferStatus',
        succeededState: {
          ...state,
          blobs: {
            ...state.blobs,
            ...action.payload,
          },
        },
      });
    }

    case TASKDOC_UPDATE_REQUESTED:
    case TASKDOC_UPDATE_SUCCEEDED:
    case TASKDOC_UPDATE_FAILED: {
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASKDOC_UPDATE',
        actionXferStatus: 'taskDocUpdateXferStatus',
        succeededState: {
          ...state,
          blobs: {
            ...state.blobs,
            ...action.payload,
          },
        },
      });
    }

    case TASKDOC_REMOVE_REQUESTED:
    case TASKDOC_REMOVE_SUCCEEDED:
    case TASKDOC_REMOVE_FAILED: {
      const blobs = { ...(state.blobs || {}) };
      delete blobs[action.payload];
      return reducerMiddlewareHelper(state, action, {
        actionTypePrefix: 'TASKDOC_REMOVE',
        actionXferStatus: 'taskDocRemoveXferStatus',
        succeededState: {
          ...state,
          blobs,
        },
      });
    }

    default:
      return state;
  }
}

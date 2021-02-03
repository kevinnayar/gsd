import { apiXferInit, apiXferRequested, apiXferSucceeded, apiXferFailed } from '../../utils/baseUtils';
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

const initialState: TaskDocsReducer = {
  taskDocGetXferStatus: apiXferInit(),
  taskDocAddXferStatus: apiXferInit(),
  taskDocUpdateXferStatus: apiXferInit(),
  taskDocRemoveXferStatus: apiXferInit(),
  blobs: null,
};

export default function reducer(state: TaskDocsReducer = initialState, action: TaskDocDispatch): TaskDocsReducer {
  switch (action.type) {
    case TASKDOC_GET_REQUESTED:
      return { ...state, taskDocGetXferStatus: apiXferRequested() };
    case TASKDOC_GET_SUCCEEDED: {
      return {
        ...state,
        taskDocGetXferStatus: apiXferSucceeded(),
        blobs: {
          ...state.blobs,
          ...action.payload,
        },
      };
    }
    case TASKDOC_GET_FAILED:
      return { ...state, taskDocGetXferStatus: apiXferFailed(action.error) };

    case TASKDOC_ADD_REQUESTED:
      return { ...state, taskDocAddXferStatus: apiXferRequested() };
    case TASKDOC_ADD_SUCCEEDED: {
      return {
        ...state,
        taskDocAddXferStatus: apiXferSucceeded(),
        blobs: {
          ...state.blobs,
          ...action.payload,
        },
      };
    }
    case TASKDOC_ADD_FAILED:
      return { ...state, taskDocAddXferStatus: apiXferFailed(action.error) };

    case TASKDOC_UPDATE_REQUESTED:
      return { ...state, taskDocUpdateXferStatus: apiXferRequested() };
    case TASKDOC_UPDATE_SUCCEEDED: {
      return {
        ...state,
        taskDocUpdateXferStatus: apiXferSucceeded(),
        blobs: {
          ...state.blobs,
          ...action.payload,
        },
      };
    }
    case TASKDOC_UPDATE_FAILED:
      return { ...state, taskDocUpdateXferStatus: apiXferFailed(action.error) };

    case TASKDOC_REMOVE_REQUESTED:
      return { ...state, taskDocRemoveXferStatus: apiXferRequested() };
    case TASKDOC_REMOVE_SUCCEEDED: {
      const blobs = { ...(state.blobs || {}) };
      delete blobs[action.payload];
      return {
        ...state,
        taskDocRemoveXferStatus: apiXferSucceeded(),
        blobs,
      };
    }
    case TASKDOC_REMOVE_FAILED:
      return { ...state, taskDocRemoveXferStatus: apiXferFailed(action.error) };

    // default
    default:
      return state;
  }
}

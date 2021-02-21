import firebase from '../../config/firebase';
import { BaseDispatch } from './baseTypes';
import { RawDraftContentState } from 'draft-js';

export const TASKDOC_GET_REQUESTED = 'TASKDOC_GET_REQUESTED';
export const TASKDOC_GET_SUCCEEDED = 'TASKDOC_GET_SUCCEEDED';
export const TASKDOC_GET_FAILED = 'TASKDOC_GET_FAILED';

export const TASKDOC_ADD_REQUESTED = 'TASKDOC_ADD_REQUESTED';
export const TASKDOC_ADD_SUCCEEDED = 'TASKDOC_ADD_SUCCEEDED';
export const TASKDOC_ADD_FAILED = 'TASKDOC_ADD_FAILED';

export const TASKDOC_UPDATE_REQUESTED = 'TASKDOC_UPDATE_REQUESTED';
export const TASKDOC_UPDATE_SUCCEEDED = 'TASKDOC_UPDATE_SUCCEEDED';
export const TASKDOC_UPDATE_FAILED = 'TASKDOC_UPDATE_FAILED';

export const TASKDOC_REMOVE_REQUESTED = 'TASKDOC_REMOVE_REQUESTED';
export const TASKDOC_REMOVE_SUCCEEDED = 'TASKDOC_REMOVE_SUCCEEDED';
export const TASKDOC_REMOVE_FAILED = 'TASKDOC_REMOVE_FAILED';

export type TaskDoc = {
  taskId: string;
  userId: string;
  blob: RawDraftContentState;
  type: 'taskDoc';
  createdDate: firebase.firestore.Timestamp;
  updatedDate: firebase.firestore.Timestamp;
};

export type TaskDocMap = {
  [id: string]: TaskDoc,
};

export type TaskDocDispatch = BaseDispatch & {
  type: 
    | typeof TASKDOC_GET_REQUESTED
    | typeof TASKDOC_GET_SUCCEEDED
    | typeof TASKDOC_GET_FAILED
    | typeof TASKDOC_ADD_REQUESTED
    | typeof TASKDOC_ADD_SUCCEEDED
    | typeof TASKDOC_ADD_FAILED
    | typeof TASKDOC_UPDATE_REQUESTED
    | typeof TASKDOC_UPDATE_SUCCEEDED
    | typeof TASKDOC_UPDATE_FAILED
    | typeof TASKDOC_REMOVE_REQUESTED
    | typeof TASKDOC_REMOVE_SUCCEEDED
    | typeof TASKDOC_REMOVE_FAILED;
};


import firebase, { auth, db } from '../../../config/firebase';
import {
  TaskDoc,
  TaskDocMap,
  TaskDocDispatch,
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
} from '../../types/taskDocTypes';

async function asyncTaskDocGet(taskId: string) {
  const taskDocRef = db.collection('taskDocs').doc(taskId).get();
  const taskDocPromise: Promise<TaskDocMap> = taskDocRef.then((doc) => {
    if (doc.exists) {
      const taskDoc = doc.data() as TaskDoc;
      return { [taskId]: taskDoc };
    } else {
      return {};
    }
  });
  const taskDocResult = await taskDocPromise;
  return taskDocResult;
}

async function asyncTaskDocAdd(taskDoc: TaskDoc): Promise<{ [id: string]: TaskDoc }> {
  await db.collection('taskDocs').doc(taskDoc.taskId).set(taskDoc);
  return { [taskDoc.taskId]: taskDoc };
}

async function asyncTaskDocUpdate(taskId: string, blob: string): Promise<{ [id: string]: TaskDoc }> {
  await db.collection('taskDocs').doc(taskId).update({ blob });
  return asyncTaskDocGet(taskId);
}

async function asyncTaskDocRemove(taskId: string): Promise<string> {
  await db.collection('taskDocs').doc(taskId).delete();
  return taskId;
}

export function taskDocGet(taskId: string) {
  return async (dispatch: (action: TaskDocDispatch) => void) => {
    dispatch({
      type: TASKDOC_GET_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocGet(taskId);
      dispatch({
        type: TASKDOC_GET_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASKDOC_GET_FAILED,
        error,
      });
    }
  };
}

export function taskDocAdd(taskDoc: TaskDoc) {
  return async (dispatch: (action: TaskDocDispatch) => void) => {
    dispatch({
      type: TASKDOC_ADD_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocAdd(taskDoc);
      dispatch({
        type: TASKDOC_ADD_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASKDOC_ADD_FAILED,
        error,
      });
    }
  };
}

export function taskDocUpdate(taskId: string, blob: string) {
  return async (dispatch: (action: TaskDocDispatch) => void) => {
    dispatch({
      type: TASKDOC_UPDATE_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocUpdate(taskId, blob);
      dispatch({
        type: TASKDOC_UPDATE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASKDOC_UPDATE_FAILED,
        error,
      });
    }
  };
}

export function taskRemove(taskId: string) {
  return async (dispatch: (action: TaskDocDispatch) => void) => {
    dispatch({
      type: TASKDOC_REMOVE_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocRemove(taskId);
      dispatch({
        type: TASKDOC_REMOVE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASKDOC_REMOVE_FAILED,
        error,
      });
    }
  };
}

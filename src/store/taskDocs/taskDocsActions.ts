import firebase from '../../../config/firebase';
import {
  TaskDoc,
  TaskDocMap,
  TaskDocGetDispatch,
  TASKDOC_GET_REQUESTED,
  TASKDOC_GET_SUCCEEDED,
  TASKDOC_GET_FAILED,
  TaskDocAddDispatch,
  TASKDOC_ADD_REQUESTED,
  TASKDOC_ADD_SUCCEEDED,
  TASKDOC_ADD_FAILED,
  TaskDocUpdateDispatch,
  TASKDOC_UPDATE_REQUESTED,
  TASKDOC_UPDATE_SUCCEEDED,
  TASKDOC_UPDATE_FAILED,
  TaskDocRemoveDispatch,
  TASKDOC_REMOVE_REQUESTED,
  TASKDOC_REMOVE_SUCCEEDED,
  TASKDOC_REMOVE_FAILED,
} from '../../types/taskDocTypes';

async function asyncTaskDocGet(db: firebase.firestore.Firestore, taskId: string) {
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

export function taskDocGet(db: firebase.firestore.Firestore, taskId: string) {
  return async (dispatch: (action: TaskDocGetDispatch) => void) => {
    dispatch({
      type: TASKDOC_GET_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocGet(db, taskId);
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

async function asyncTaskDocAdd(db: firebase.firestore.Firestore, taskDoc: TaskDoc): Promise<{ [id: string]: TaskDoc }> {
  await db.collection('taskDocs').doc(taskDoc.taskId).set(taskDoc);
  return { [taskDoc.taskId]: taskDoc };
}

export function taskDocAdd(db: firebase.firestore.Firestore, taskDoc: TaskDoc) {
  return async (dispatch: (action: TaskDocAddDispatch) => void) => {
    dispatch({
      type: TASKDOC_ADD_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocAdd(db, taskDoc);
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

async function asyncTaskDocUpdate(
  db: firebase.firestore.Firestore,
  taskDoc: TaskDoc,
): Promise<{ [id: string]: TaskDoc }> {
  await db.collection('taskDocs').doc(taskDoc.taskId).update(taskDoc);
  return { [taskDoc.taskId]: taskDoc };
}

export function taskDocUpdate(db: firebase.firestore.Firestore, taskDoc: TaskDoc) {
  return async (dispatch: (action: TaskDocUpdateDispatch) => void) => {
    dispatch({
      type: TASKDOC_UPDATE_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocUpdate(db, taskDoc);
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

async function asyncTaskDocRemove(db: firebase.firestore.Firestore, taskId: string): Promise<string> {
  await db.collection('taskDocs').doc(taskId).delete();
  return taskId;
}

export function taskRemove(db: firebase.firestore.Firestore, taskId: string) {
  return async (dispatch: (action: TaskDocRemoveDispatch) => void) => {
    dispatch({
      type: TASKDOC_REMOVE_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocRemove(db, taskId);
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

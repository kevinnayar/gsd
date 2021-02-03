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

async function asyncTaskDocGet(db: firebase.firestore.Firestore, userId: string, taskId: string): Promise<TaskDocMap> {
  const tasksRef = db.collection('taskDocs').where('userId', '==', userId).where('taskId', '==', taskId);
  const tasksPromise: Promise<TaskDocMap> = tasksRef.get().then((tasksSnapshot) => {
    const taskMap = {};
    tasksSnapshot.forEach((doc) => {
      const task = doc.data();
      taskMap[task.taskId] = task;
    });
    return taskMap;
  });
  const tasks = await tasksPromise;
  return tasks;
}

export function taskDocGet(db: firebase.firestore.Firestore, userId: string, taskId: string) {
  return async (dispatch: (action: TaskDocGetDispatch) => void) => {
    dispatch({
      type: TASKDOC_GET_REQUESTED,
    });

    try {
      const payload = await asyncTaskDocGet(db, userId, taskId);
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

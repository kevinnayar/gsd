import firebase from '../../../config/firebase';
import {
  ITaskItem,
  TaskMap,

  TaskGetAllDispatch,
  TASKS_GET_ALL_REQUESTED,
  TASKS_GET_ALL_SUCCEEDED,
  TASKS_GET_ALL_FAILED,

  TaskAddDispatch,
  TASK_ADD_REQUESTED,
  TASK_ADD_SUCCEEDED,
  TASK_ADD_FAILED,

  TaskUpdateDispatch,
  TASK_UPDATE_REQUESTED,
  TASK_UPDATE_SUCCEEDED,
  TASK_UPDATE_FAILED,

  TaskRemoveDispatch,
  TASK_REMOVE_REQUESTED,
  TASK_REMOVE_SUCCEEDED,
  TASK_REMOVE_FAILED,
} from '../../types/taskTypes';

async function asyncTasksGetAll(
  db: firebase.firestore.Firestore,
  userId: string
): Promise<TaskMap> {
  const tasksRef = db.collection('tasks').where('userId', '==', userId);
  const tasksPromise: Promise<TaskMap> = tasksRef.get().then((tasksSnapshot) => {
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

export function tasksGetAll(db: firebase.firestore.Firestore, userId: string) {
  return async (dispatch: (action: TaskGetAllDispatch) => void) => {
    dispatch({
      type: TASKS_GET_ALL_REQUESTED,
    });

    try {
      const payload = await asyncTasksGetAll(db, userId);
      dispatch({
        type: TASKS_GET_ALL_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASKS_GET_ALL_FAILED,
        error,
      });
    }
  };
}

async function asyncTaskAdd(db: firebase.firestore.Firestore, task: ITaskItem): Promise<{ [id: string]: ITaskItem }> {
  await db.collection('tasks').doc(task.taskId).set(task);
  return { [task.taskId]: task };
}

export function taskAdd(db: firebase.firestore.Firestore, task: ITaskItem) {
  return async (dispatch: (action: TaskAddDispatch) => void) => {
    dispatch({
      type: TASK_ADD_REQUESTED,
    });

    try {
      const payload = await asyncTaskAdd(db, task);
      dispatch({
        type: TASK_ADD_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASK_ADD_FAILED,
        error,
      });
    }
  };
}

async function asyncTaskUpdate(db: firebase.firestore.Firestore, task: ITaskItem): Promise<{ [id: string]: ITaskItem }> {
  await db.collection('tasks').doc(task.taskId).update(task);
  return { [task.taskId]: task };
}

export function taskUpdate(db: firebase.firestore.Firestore, task: ITaskItem) {
  return async (dispatch: (action: TaskUpdateDispatch) => void) => {
    dispatch({
      type: TASK_UPDATE_REQUESTED,
    });

    try {
      const payload = await asyncTaskUpdate(db, task);
      dispatch({
        type: TASK_UPDATE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASK_UPDATE_FAILED,
        error,
      });
    }
  };
}

async function asyncTaskRemove(db: firebase.firestore.Firestore, taskId: string): Promise<string> {
  await db.collection('tasks').doc(taskId).delete();
  return taskId;
}

export function taskRemove(db: firebase.firestore.Firestore, taskId: string) {
  return async (dispatch: (action: TaskRemoveDispatch) => void) => {
    dispatch({
      type: TASK_REMOVE_REQUESTED,
    });

    try {
      const payload = await asyncTaskRemove(db, taskId);
      dispatch({
        type: TASK_REMOVE_SUCCEEDED,
        payload,
      });
    } catch (error) {
      dispatch({
        type: TASK_REMOVE_FAILED,
        error,
      });
    }
  };
}



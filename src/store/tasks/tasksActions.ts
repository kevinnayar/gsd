import firebase, { auth, db } from '../../../config/firebase';
import { createTaskDoc } from '../../utils/baseUtils';
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

async function asyncTasksGetAll(userId: string): Promise<TaskMap> {
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

async function asyncTaskAdd(task: ITaskItem): Promise<{ [id: string]: ITaskItem }> {
  const batch = db.batch();

  const taskRef = db.collection('tasks').doc(task.taskId);
  batch.set(taskRef, { ...task });

  const taskDoc = createTaskDoc(task);
  const taskDocRef = db.collection('taskDocs').doc(task.taskId);
  batch.set(taskDocRef, { ...taskDoc });

  await batch.commit();

  return { [task.taskId]: task };
}

async function asyncTaskUpdate(task: ITaskItem): Promise<{ [id: string]: ITaskItem }> {
  await db.collection('tasks').doc(task.taskId).update(task);
  return { [task.taskId]: task };
}

async function asyncTaskRemove(taskId: string): Promise<string> {
  await db.collection('tasks').doc(taskId).delete();
  return taskId;
}

export function tasksGetAll(userId: string) {
  return async (dispatch: (action: TaskGetAllDispatch) => void) => {
    dispatch({
      type: TASKS_GET_ALL_REQUESTED,
    });

    try {
      const payload = await asyncTasksGetAll(userId);
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

export function taskAdd(task: ITaskItem) {
  return async (dispatch: (action: TaskAddDispatch) => void) => {
    dispatch({
      type: TASK_ADD_REQUESTED,
    });

    try {
      const payload = await asyncTaskAdd(task);
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

export function taskUpdate(task: ITaskItem) {
  return async (dispatch: (action: TaskUpdateDispatch) => void) => {
    dispatch({
      type: TASK_UPDATE_REQUESTED,
    });

    try {
      const payload = await asyncTaskUpdate(task);
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

export function taskRemove(taskId: string) {
  return async (dispatch: (action: TaskRemoveDispatch) => void) => {
    dispatch({
      type: TASK_REMOVE_REQUESTED,
    });

    try {
      const payload = await asyncTaskRemove(taskId);
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



import { db } from '../../../config/firebase';
import { createTaskDoc } from '../../utils/baseUtils';
import {
  ITaskItem,
  TaskMap,
  TasksDispatch,
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
} from '../../types/taskTypes';

async function asyncTasksGetAll(userId: string): Promise<TaskMap> {
  const tasksRef = db.collection('tasks').where('userId', '==', userId);
  const tasksPromise: Promise<ITaskItem[]> = tasksRef.get().then((tasksSnapshot) => {
    const tasks = [];
    tasksSnapshot.forEach((doc) => {
      const task = doc.data();
      tasks.push(task);
    });
    return tasks;
  });

  const taskList = await tasksPromise;
  taskList.sort((a, b) => {
    if (a.createdDate.seconds > b.createdDate.seconds) return -1;
    if (a.createdDate.seconds < b.createdDate.seconds) return 1;
    return 0;
  });

  return taskList.reduce((map, t) => {
    map[t.taskId] = t;
    return map;
  }, {});
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
  const batch = db.batch();

  const taskRef = db.collection('tasks').doc(taskId);
  batch.delete(taskRef);

  const taskDocRef = db.collection('taskDocs').doc(taskId);
  batch.delete(taskDocRef);

  await batch.commit();
  return taskId;
}

export function tasksGetAll(userId: string) {
  return async (dispatch: (action: TasksDispatch) => void) => {
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
  return async (dispatch: (action: TasksDispatch) => void) => {
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
  return async (dispatch: (action: TasksDispatch) => void) => {
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
  return async (dispatch: (action: TasksDispatch) => void) => {
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



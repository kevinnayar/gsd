import firebase from '../../../config/firebase';
import {
  TaskMap,
  TaskGetAllDispatch,
  TASKS_GET_ALL_REQUESTED,
  TASKS_GET_ALL_SUCCEEDED,
  TASKS_GET_ALL_FAILED,
} from '../../../types/taskTypes';

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
  console.log({tasks});
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

import firebase from '../config/firebase';
import { ITaskItem, IUserTasksContext } from '../types/baseTypes';

function formatTaskItems(tasks: ITaskItem[]): IUserTasksContext {
  const completeTasks = { taskMap: {}, taskIds: [] };
  const incompleteTasks = { taskMap: {}, taskIds: [] };

  for (const task of tasks) {
    const taskData = task.completed ? completeTasks : incompleteTasks;
    taskData.taskMap[task.taskId] = task;
    taskData.taskIds.push(task.taskId);
  }

  return {
    completeTasks,
    incompleteTasks,
  };
}

export async function getUserTasks(db: firebase.firestore.Firestore, userId: string): Promise<IUserTasksContext> {
  const tasksRef = db.collection('tasks').where('userId', '==', userId);
  const tasksPromise: Promise<ITaskItem[]> = tasksRef.get().then((tasksSnapshot) => {
    const list = [];
    tasksSnapshot.forEach((doc) => list.push(doc.data()));
    return list;
  });
  const tasks = await tasksPromise;
  return formatTaskItems(tasks);
}

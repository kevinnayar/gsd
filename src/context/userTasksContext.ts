import { createContext } from 'react';
import { IUserTasksContext } from '../../types/baseTypes';

export const initUserTasks = undefined;

export default createContext<[IUserTasksContext, React.Dispatch<React.SetStateAction<IUserTasksContext>>]>([
  initUserTasks,
  () => {},
]);

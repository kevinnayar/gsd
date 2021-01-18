export type ITaskItem = {
  id: string;
  name: string;
  type: 'task';
  completed: boolean;
  createdDate: number;
  dueDay: string;
};

export type ITaskMap = { [id: string]: ITaskItem };

export type ITaskData = {
  taskMap: ITaskMap;
  taskIds: string[];
};

export type IThemeMode = 'light-mode' | 'dark-mode';

export type ColumnId = 'incomplete' | 'complete';

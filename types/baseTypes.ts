export type ITaskItem = {
  id: string;
  name: string;
  type: 'task';
  completed: boolean;
  createdDate: number;
  dueDay: string;
  position: number;
};

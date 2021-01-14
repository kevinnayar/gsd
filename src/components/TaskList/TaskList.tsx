import * as React from 'react';
import { TaskDropZone } from '../TaskDropZone/TaskDropZone';
import { TaskItem } from '../TaskItem/TaskItem';
import { ITaskItem } from '../../../types/baseTypes';

type TaskListProps = {
  tasks: ITaskItem[]
  title: string,
  noTasksMessage: string,
  icon?: any,
  updateTaskItem: (taskItem: ITaskItem) => void,
  deleteTaskItem: (taskItemId: string) => void,
  moveTaskItem: (from: number, to: number) => void,
};

export function TaskList(props: TaskListProps) {
  const {
    tasks,
    title,
    noTasksMessage,
    icon,
    updateTaskItem,
    deleteTaskItem,
    moveTaskItem,
  } = props;

  return (
    <div className="column">
      <div className="column__title">
        <h2>{title}</h2>{icon}
      </div>
      <div className="column__body">
        <div className="task-list task-list--incompleted">
          {!tasks.length ? <p className="no-task-list-item">{noTasksMessage}</p> : null}
          {tasks.map((task) => (
            <div className="task-list__item" key={task.id}>
              <TaskDropZone position={task.position} updatePosition={moveTaskItem} />
              <TaskItem taskItem={task} updateTaskItem={updateTaskItem} deleteTaskItem={deleteTaskItem} />
            </div>
          ))}
          {tasks.length ? <TaskDropZone position={tasks.length} updatePosition={moveTaskItem} />: null}
        </div>
      </div>
    </div>
  );
}



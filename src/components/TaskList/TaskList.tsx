import * as React from 'react';
import { TaskItem } from '../TaskItem/TaskItem';
import { TaskMap, ITaskItem } from '../../types/taskTypes';

type TaskListProps = {
  taskMap: TaskMap;
  getTaskDocBlob: (taskId: string) => void;
  updateTask: (task: ITaskItem) => void;
  deleteTask: (taskId: string) => void;
};

export function TaskList(props: TaskListProps) {
  const taskIds = Object.keys(props.taskMap);

  if (!taskIds.length) return <p>No tasks.</p>

  return (
    <div className="task-list">
      {taskIds.map((id) => {
        const task = props.taskMap[id];
        return (
          <div className="task-list__item" key={id}>
            <TaskItem
              task={task}
              getTaskDocBlob={props.getTaskDocBlob}
              updateTask={props.updateTask}
              deleteTask={props.deleteTask}
            />
          </div>
        );
      })}
    </div>
  );
}



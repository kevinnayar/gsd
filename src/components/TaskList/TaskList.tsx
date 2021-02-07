import * as React from 'react';
import { TaskItem } from '../TaskItem/TaskItem';
import { NoTaskItem } from '../NoTaskItem/NoTaskItem';
import { TaskMap } from '../../types/taskTypes';

type TaskListProps = {
  taskMap: TaskMap;
};

export function TaskList(props: TaskListProps) {
  const taskIds = Object.keys(props.taskMap);

  return (
    <div className="task-list">
      {!taskIds.length ? <NoTaskItem /> : null}
      {taskIds.map((id) => {
        const task = props.taskMap[id];
        return <TaskItem key={id} task={task} />;
      })}
    </div>
  );
}



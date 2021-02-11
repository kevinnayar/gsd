import * as React from 'react';
import { TaskItem } from '../TaskItem/TaskItem';
import { NoTaskItem } from '../../components/NoTaskItem/NoTaskItem';
import { TaskMap } from '../../types/taskTypes';

export const TaskList = React.memo((props: { taskMap: TaskMap, taskId: void | string }) => {
  const taskIds = Object.keys(props.taskMap);

  return (
    <div className="task-list">
      {!taskIds.length ? <NoTaskItem /> : null}
      {taskIds.map((id) => {
        const task = props.taskMap[id];
        const active = id === props.taskId;
        return <TaskItem key={id} task={task} active={active} />;
      })}
    </div>
  );
});




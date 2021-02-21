import * as React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import NoneTaskItem from '../NoneTaskItem/NoneTaskItem';
import { TaskMap } from '../../types/taskTypes';

const TaskList = (props: { taskMap: TaskMap, taskId: void | string }) => {
  const taskIds = Object.keys(props.taskMap);

  return (
    <div className={`task-list task-list--${taskIds.length ? 'with-items' : 'no-items'}`}>
      <NoneTaskItem />
      {taskIds.map((id) => {
        const task = props.taskMap[id];
        const active = id === props.taskId;
        return <TaskItem key={id} task={task} taskIds={taskIds} active={active} />;
      })}
    </div>
  );
};

export default TaskList;





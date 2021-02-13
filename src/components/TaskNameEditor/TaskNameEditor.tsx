import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { taskUpdate } from '../../store/tasks/tasksActions';
import { ITaskItem } from '../../types/taskTypes';

export const TaskNameEditor = (props: { task: ITaskItem }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(props.task.name);

  const completedSuffix = props.task.completed ? 'completed' : 'incomplete';

  useEffect(() => {
    if (props.task.name !== taskName) {
      setTaskName(props.task.name);
    }
  }, [props.task]);

  const onChangeTaskName = (e: any) => {
    setTaskName(e.target.value);
  };

  const onBlurTaskName = (e: any) => {
    const name = e.target.value.trim();
    setTaskName(name);
    const task = { ...props.task, name };
    dispatch(taskUpdate(task));
  };

  return (
    <input
      className={`task-name-editor task-name-editor--${completedSuffix}`}
      value={taskName}
      onChange={onChangeTaskName}
      onBlur={onBlurTaskName}
    />
  );
};





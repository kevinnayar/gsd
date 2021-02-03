import * as React from 'react';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import { ITaskItem } from '../../types/taskTypes';

type TaskItemProps = {
  task: ITaskItem;
  getTaskDocBlob: (taskId: string) => void;
  updateTask: (task: ITaskItem) => void;
  deleteTask: (taskId: string) => void;
};

export function TaskItem(props: TaskItemProps) {
  const [name, setName] = useState(props.task.name);
  const [focused, setFocused] = useState(false);

  const handleOnChangeName = (e: any) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleOnFocusName = (e: any) => {
    e.preventDefault();
    setFocused(true);
  };

  const handleOnBlurName = (e: any) => {
    e.preventDefault();
    setFocused(false);
    const trimmed = name.trim();
    setName(trimmed);
    const task = {
      ...props.task,
      name: trimmed,
    };
    props.updateTask(task);
  };
  
  const handleOnChangeTaskCompletion = (e: any) => {
    e.preventDefault();
    const task = {
      ...props.task,
      completed: !props.task.completed
    };
    props.updateTask(task);
  };

  const handleOnDeleteTask = (e: any) => {
    e.preventDefault();
    props.deleteTask(props.task.taskId);
  };

  const completedClass = props.task.completed ? 'complete' : 'incomplete';
  const focusedClass = !props.task.completed && focused ? 'focused' : 'unfocused';

  return (
    <div className={`task-item task-item--${completedClass} task-item--${focusedClass}`}>
      <input
        className="task-item__name"
        value={name}
        readOnly={props.task.completed}
        onChange={handleOnChangeName}
        onBlur={handleOnBlurName}
        onFocus={handleOnFocusName}
      />
      <div className="task-item__actions">
        <Icon
          iconName="create"
          className="edit-task"
          onClick={(_e) => props.getTaskDocBlob(props.task.taskId)}
        />
        <Icon
          iconName={!props.task.completed ? "done" : "clear"}
          className="complete-task"
          onClick={handleOnChangeTaskCompletion}
        />
        <Icon
          iconName="delete"
          className="delete-task"
          onClick={handleOnDeleteTask}
        />
      </div>
    </div>
  );
}
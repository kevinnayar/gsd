import * as React from 'react';
import { useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { Icon } from '../Icon/Icon';
import { ITaskItem } from '../../../types/baseTypes';

type TaskItemProps = {
  taskItem: ITaskItem;
  updateTaskItem: (taskItem: ITaskItem) => void;
  deleteTaskItem: (taskItemId: string) => void;
};

export function TaskItem(props: TaskItemProps) {
  const [name, setName] = useState(props.taskItem.name);

  const [{ isDragging }, drag] = useDrag({
    item: props.taskItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const completedStateClass = props.taskItem.completed
    ? "task-item--complete"
    : "task-item--incomplete";

  const handleOnChangeName = (e: any) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleOnBlurName = (e: any) => {
    e.preventDefault();

    const trimmed = name.trim();
    setName(trimmed);

    const taskItem = { ...props.taskItem, name: trimmed };
    props.updateTaskItem(taskItem);
  };

  const handleToggleTaskCompletion = (e: any) => {
    e.preventDefault();

    const updatedTaskItem = {
      ...props.taskItem,
      completed: !props.taskItem.completed
    };

    props.updateTaskItem(updatedTaskItem);
  };

  const handleTaskDeletion = (e: any) => {
    e.preventDefault();
    props.deleteTaskItem(props.taskItem.id);
  };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`task-item ${completedStateClass}`}
    >
      <div className="task-item__actions task-item__actions--before">
        <Icon
          iconName="drag_indicator"
          className="drag-task"
          onClick={() => {}}
        />
      </div>
      <input
        className="task-item__name"
        value={name}
        readOnly={props.taskItem.completed}
        onChange={handleOnChangeName}
        onBlur={handleOnBlurName}
      />
      <div className="task-item__actions task-item__actions--after">
        <Icon
          iconName={!props.taskItem.completed ? "done" : "clear"}
          className="complete-task"
          onClick={handleToggleTaskCompletion}
        />
        <Icon
          iconName="delete"
          className="delete-task"
          onClick={handleTaskDeletion}
        />
      </div>
    </div>
  );
}
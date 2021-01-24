import * as React from 'react';
import { TaskDropZone } from '../TaskDropZone/TaskDropZone';
import { TaskItem } from '../TaskItem/TaskItem';
import { ITaskMap, ITaskItem, ColumnId } from '../../../types/baseTypes';

type TaskListProps = {
  taskMap: ITaskMap,
  taskIds: string[],
  columnId: ColumnId;
  title: string,
  noTasksMessage: string,
  icon?: any,
  updateTaskItem: (taskItem: ITaskItem) => void,
  deleteTaskItem: (taskItemId: string) => void,
  moveTaskItem: (taskItem: ITaskItem, to: number, columnId: ColumnId) => void,
};

export function TaskList(props: TaskListProps) {
  const {
    taskMap,
    taskIds,
    columnId,
    title,
    noTasksMessage,
    icon,
    updateTaskItem,
    deleteTaskItem,
    moveTaskItem,
  } = props;

  console.log('tm', taskMap);

  return (
    <div className="column">
      <div className="column__title">
        <h2>{title}</h2> {icon}
      </div>
      <div className="column__body">
        <div className="task-list task-list--incompleted">
          {!taskIds.length ? <p className="no-task-list-item">{noTasksMessage}</p> : null}
          {taskIds.map((taskId, index) => {
            const task = taskMap[taskId];
            return (
              <div className="task-list__item" key={task.taskId}>
                <TaskDropZone
                  position={index}
                  columnId={columnId}
                  updatePosition={moveTaskItem}
                />
                <TaskItem
                  taskItem={task}
                  taskIds={taskIds}
                  updateTaskItem={updateTaskItem}
                  deleteTaskItem={deleteTaskItem}
                />
              </div>
            );
          })}
          <TaskDropZone
            position={taskIds.length}
            columnId={columnId}
            updatePosition={moveTaskItem}
          />
        </div>
      </div>
    </div>
  );
}



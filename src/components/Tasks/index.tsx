import * as React from 'react';
import { useState } from 'react';
import * as uuid from 'uuid';

import firebase from '../../../config/firebase';
import { Icon } from '../Icon';
import { TaskList } from './TaskList';
import { insertAtIndex, moveItemInList } from '../../utils/baseUtils';
import { ColumnId } from '../../types/baseTypes';
import { UserDef } from '../../types/authTypes';
import { TaskItem, TaskMap, TaskDataByStatus } from '../../types/taskTypes';

type TasksProps = {
  db: firebase.firestore.Firestore;
  userDef: null | UserDef;
  taskData: null | TaskDataByStatus;
};

export function Tasks(props: TasksProps) {
  if (!props.userDef || !props.taskData) return <div>loading...</div>;

  const userDef: UserDef = props.userDef;
  const { incompleteTasks, completeTasks }: TaskDataByStatus = props.taskData;

  const [incompleteTaskMap, setIncompleteTaskMap] = useState<TaskMap>(incompleteTasks.taskMap);
  const [incompleteTaskIds, setIncompleteTaskIds] = useState<string[]>(incompleteTasks.taskIds);

  const [completeTaskMap, setCompleteTaskMap] = useState<TaskMap>(completeTasks.taskMap);
  const [completeTaskIds, setCompleteTaskIds] = useState<string[]>(completeTasks.taskIds);

  const addTaskItem = () => {
    const createdDate = Date.now();
    const taskItem: TaskItem = {
      taskId: uuid.v4(),
      userId: userDef.userId,
      name: 'Some more shit that I have to do',
      type: 'task',
      completed: false,
      createdDate,
    };

    setIncompleteTaskIds([ ...incompleteTaskIds, taskItem.taskId ]);
    setIncompleteTaskMap({ ...incompleteTaskMap, [taskItem.taskId]: taskItem });
  };

  const updateTaskItem = (taskItem: TaskItem) => {
    const { taskId } = taskItem;
    const incompleted = incompleteTaskMap[taskId];
    const completed = completeTaskMap[taskId];

    if (incompleted) {
      const beingCompleted = taskItem.completed;
      if (beingCompleted) {
        setIncompleteTaskIds(incompleteTaskIds.filter(_taskId => _taskId !== taskId));
        const { [taskId]: omit, ..._incompleteTaskMap } = incompleteTaskMap;
        setIncompleteTaskMap(_incompleteTaskMap);

        setCompleteTaskIds([ taskId, ...completeTaskIds ]);
        setCompleteTaskMap({ ...completeTaskMap, [taskId]: taskItem });
      } else {
        setIncompleteTaskMap({ ...incompleteTaskMap, [taskId]: taskItem });
      }
    }
    if (completed) {
      const beingIncompleted = !taskItem.completed;
      if (beingIncompleted) {
        setCompleteTaskIds(completeTaskIds.filter(_taskId => _taskId !== taskId));
        const { [taskId]: omit, ..._completeTaskMap } = completeTaskMap;
        setCompleteTaskMap(_completeTaskMap);

        setIncompleteTaskIds([ taskId, ...incompleteTaskIds ]);
        setIncompleteTaskMap({ ...incompleteTaskMap, [taskId]: taskItem });
      } else {
        setCompleteTaskMap({ ...completeTaskMap, [taskId]: taskItem });
      }
    }
  };

  const deleteTaskItem = (taskId: string) => {
    const incompleted = incompleteTaskMap[taskId];
    const completed = completeTaskMap[taskId];

    if (incompleted) {
      setIncompleteTaskIds(incompleteTaskIds.filter(_taskId => _taskId !== taskId));
      const { [taskId]: omit, ..._incompleteTaskMap } = incompleteTaskMap;
      setIncompleteTaskMap(_incompleteTaskMap);
    }
    if (completed) {
      setCompleteTaskIds(completeTaskIds.filter(_taskId => _taskId !== taskId));
      const { [taskId]: omit, ..._completeTaskMap } = completeTaskMap;
      setCompleteTaskMap(_completeTaskMap);
    }
  };

  const moveTaskItem = (taskItem: TaskItem, to: number, columnId: ColumnId) => {
    const incompleted = incompleteTaskMap[taskItem.taskId];
    const completed = completeTaskMap[taskItem.taskId];

    if (incompleted && columnId === 'incomplete' || completed && columnId === 'complete') {
      const [taskIds, setTaskIds] = incompleted
        ? [incompleteTaskIds, setIncompleteTaskIds]
        : [completeTaskIds, setCompleteTaskIds];
      
      const from = taskIds.findIndex(taskId => taskId === taskItem.taskId);
      setTaskIds(moveItemInList(taskIds, from, to));
    } else {
      const item = {
        ...taskItem,
        completed: !taskItem.completed,
      };
      
      const [fromTaskIds, setFromTaskIds, fromTaskMap, setFromTaskMap] = incompleted
        ? [incompleteTaskIds, setIncompleteTaskIds, incompleteTaskMap, setIncompleteTaskMap]
        : [completeTaskIds, setCompleteTaskIds, completeTaskMap, setCompleteTaskMap];

      const [toTaskIds, setToTaskIds, toTaskMap, setToTaskMap] = incompleted
        ? [completeTaskIds, setCompleteTaskIds, completeTaskMap, setCompleteTaskMap]
        : [incompleteTaskIds, setIncompleteTaskIds, incompleteTaskMap, setIncompleteTaskMap];

      setFromTaskIds(fromTaskIds.filter(taskId => taskId !== item.taskId));
      const { [item.taskId]: omit, ..._fromTaskMap } = fromTaskMap;
      setFromTaskMap(_fromTaskMap);

      setToTaskMap({ ...toTaskMap, [item.taskId]: item });
      setToTaskIds(insertAtIndex(toTaskIds, item.taskId, to));
    }
  };

  return (
    <div className="tasks">
      <TaskList
        taskMap={incompleteTaskMap}
        taskIds={incompleteTaskIds}
        columnId="incomplete"
        title="Shit I need to do."
        noTasksMessage="I ain't got shit to do."
        icon={<Icon iconName="add" className="create-task" onClick={addTaskItem} />}
        updateTaskItem={updateTaskItem}
        deleteTaskItem={deleteTaskItem}
        moveTaskItem={moveTaskItem}
      />

      <TaskList
        taskMap={completeTaskMap}
        taskIds={completeTaskIds}
        columnId="complete"
        title="Shit I've already done."
        noTasksMessage="I really haven't done shit."
        updateTaskItem={updateTaskItem}
        deleteTaskItem={deleteTaskItem}
        moveTaskItem={moveTaskItem}
      />
    </div>
  );
}



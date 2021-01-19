import * as React from 'react';
import { useState } from 'react';
import * as uuid from 'uuid';
import { Icon } from '../../components/Icon/Icon';
import { TaskList } from '../../components/TaskList/TaskList';
import { unixTimestampToDayDate, insertAtIndex, moveItemInList } from '../../../utils/baseUtils';
import { ITaskData, ITaskMap, ITaskItem, IThemeMode, ColumnId } from '../../../types/baseTypes';

type TasksProps = {
  completeTasks: ITaskData,
  incompleteTasks: ITaskData,
};

export function TasksPage(props: TasksProps) {
  const [incompleteTaskMap, setIncompleteTaskMap] = useState<ITaskMap>(props.incompleteTasks.taskMap);
  const [incompleteTaskIds, setIncompleteTaskIds] = useState<string[]>(props.incompleteTasks.taskIds);

  const [completeTaskMap, setCompleteTaskMap] = useState<ITaskMap>(props.completeTasks.taskMap);
  const [completeTaskIds, setCompleteTaskIds] = useState<string[]>(props.completeTasks.taskIds);

  const [showCompleted, setShowCompleted] = useState(true);

  const addTaskItem = () => {
    const createdDate = Date.now();
    const taskItem: ITaskItem = {
      id: uuid.v4(),
      name: 'Some more shit that I have to do',
      type: 'task',
      completed: false,
      createdDate,
      dueDay: unixTimestampToDayDate(createdDate),
    };

    setIncompleteTaskIds([ ...incompleteTaskIds, taskItem.id ]);
    setIncompleteTaskMap({ ...incompleteTaskMap, [taskItem.id]: taskItem });
  };

  const updateTaskItem = (taskItem: ITaskItem) => {
    const { id } = taskItem;
    const incompleted = incompleteTaskMap[id];
    const completed = completeTaskMap[id];

    if (incompleted) {
      const beingCompleted = taskItem.completed;
      if (beingCompleted) {
        setIncompleteTaskIds(incompleteTaskIds.filter(_id => _id !== id));
        const { [id]: omit, ..._incompleteTaskMap } = incompleteTaskMap;
        setIncompleteTaskMap(_incompleteTaskMap);

        setCompleteTaskIds([ id, ...completeTaskIds ]);
        setCompleteTaskMap({ ...completeTaskMap, [id]: taskItem });
      } else {
        setIncompleteTaskMap({ ...incompleteTaskMap, [id]: taskItem });
      }
    }
    if (completed) {
      const beingIncompleted = !taskItem.completed;
      if (beingIncompleted) {
        setCompleteTaskIds(completeTaskIds.filter(_id => _id !== id));
        const { [id]: omit, ..._completeTaskMap } = completeTaskMap;
        setCompleteTaskMap(_completeTaskMap);

        setIncompleteTaskIds([ id, ...incompleteTaskIds ]);
        setIncompleteTaskMap({ ...incompleteTaskMap, [id]: taskItem });
      } else {
        setCompleteTaskMap({ ...completeTaskMap, [id]: taskItem });
      }
    }
  };

  const deleteTaskItem = (id: string) => {
    const incompleted = incompleteTaskMap[id];
    const completed = completeTaskMap[id];

    if (incompleted) {
      setIncompleteTaskIds(incompleteTaskIds.filter(_id => _id !== id));
      const { [id]: omit, ..._incompleteTaskMap } = incompleteTaskMap;
      setIncompleteTaskMap(_incompleteTaskMap);
    }
    if (completed) {
      setCompleteTaskIds(completeTaskIds.filter(_id => _id !== id));
      const { [id]: omit, ..._completeTaskMap } = completeTaskMap;
      setCompleteTaskMap(_completeTaskMap);
    }
  };

  const moveTaskItem = (taskItem: ITaskItem, to: number, columnId: ColumnId) => {
    const incompleted = incompleteTaskMap[taskItem.id];
    const completed = completeTaskMap[taskItem.id];

    if (incompleted && columnId === 'incomplete' || completed && columnId === 'complete') {
      const [taskIds, setTaskIds] = incompleted
        ? [incompleteTaskIds, setIncompleteTaskIds]
        : [completeTaskIds, setCompleteTaskIds];
      
      const from = taskIds.findIndex(id => id === taskItem.id);
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

      setFromTaskIds(fromTaskIds.filter(id => id !== item.id));
      const { [item.id]: omit, ..._fromTaskMap } = fromTaskMap;
      setFromTaskMap(_fromTaskMap);

      setToTaskMap({ ...toTaskMap, [item.id]: item });
      setToTaskIds(insertAtIndex(toTaskIds, item.id, to));
    }
  };

  const hideCompletedTasks = () => {
    setShowCompleted(false);
  }

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

      {showCompleted && (
        <TaskList
          taskMap={completeTaskMap}
          taskIds={completeTaskIds}
          columnId="complete"
          title="Shit I've already done."
          noTasksMessage="I really haven't done shit."
          icon={<Icon iconName="visibility_off" className="hide-list" onClick={hideCompletedTasks} />}
          updateTaskItem={updateTaskItem}
          deleteTaskItem={deleteTaskItem}
          moveTaskItem={moveTaskItem}
        />
      )}
    </div>
  );
}



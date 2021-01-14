import * as React from 'react';
import { useState } from 'react';
import * as uuid from 'uuid';
import { Icon } from '../Icon/Icon';
import { TaskList } from '../TaskList/TaskList';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { 
  unixTimestampToDayDate, 
  updateTaskListPositionByIndex,
  sortTaskListAsc,
  moveItemInList,
} from '../../../utils/baseUtils';
import { ITaskItem } from '../../../types/baseTypes';

export function Tasks(props: { taskList: ITaskItem[] }) {
  const [taskList, setTaskList] = useState<ITaskItem[]>(props.taskList);

  const updateTaskItem = (taskItem: ITaskItem) => {
    const updatedList = taskList.map((item) => item.id === taskItem.id ? taskItem : item);
    setTaskList(updatedList);
  };

  const addTaskItem = () => {
    const createdDate = Date.now();
    const dueDay = unixTimestampToDayDate(createdDate);
    const newItem: ITaskItem = {
      id: uuid.v4(),
      name: 'Some more shit that I have to do',
      type: 'task',
      completed: false,
      createdDate,
      dueDay,
      position: 0,
    };
    const updatedList = taskList.map((item) => {
      item.position = item.position + 1;
      return item;
    });
    setTaskList([newItem, ...updatedList]);
  };

  const deleteTaskItem = (taskItemId: string) => {
    const filteredList = taskList.filter((item) => item.id !== taskItemId);
    const updatedList = updateTaskListPositionByIndex(filteredList);
    setTaskList(updatedList);
  };

  const moveTaskItem = (from: number, to: number) => {
    const sortedList = sortTaskListAsc(taskList);
    const arrangedList = moveItemInList(sortedList, from, to);
    const updatedList = updateTaskListPositionByIndex(arrangedList);
    setTaskList(updatedList);
  };

  const incompleteTasks = sortTaskListAsc(taskList.filter((item) => item.completed === false));
  const completeTasks = sortTaskListAsc(taskList.filter((item) => item.completed === true));

  return (
    <div className="tasks">
      <div className="tasks__header">
        <h1>Get shit done</h1>
        <ThemeSwitch />
      </div>

      <div className="tasks__column tasks__column--odd">
        <TaskList
          tasks={incompleteTasks}
          title="Shit I need to do."
          noTasksMessage="I ain't got shit to do."
          icon={<Icon iconName="add" className="create-task" onClick={addTaskItem} />}
          updateTaskItem={updateTaskItem}
          deleteTaskItem={deleteTaskItem}
          moveTaskItem={moveTaskItem}
        />
      </div>

      <div className="tasks__column tasks__column--even">
        <TaskList
          tasks={completeTasks}
          title="Shit I've already done."
          noTasksMessage="I really haven't done shit."
          updateTaskItem={updateTaskItem}
          deleteTaskItem={deleteTaskItem}
          moveTaskItem={moveTaskItem}
        />
        </div>
    </div>
  );
}



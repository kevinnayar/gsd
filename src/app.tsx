import * as React from 'react';
import * as uuid from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Tasks } from './components/Tasks/Tasks';
import { unixTimestampToDayDate, isMobileDevice, getLocalTheme, setLocalTheme } from '../utils/baseUtils';
import { ITaskItem, ITaskMap, ITaskData, IThemeMode } from '../types/baseTypes';

function generateTaskItems(taskNames: string[]): ITaskData {
  const taskMap: ITaskMap = {};
  const taskIds: string[] = [];

  const createdDate = Date.now();
  const dueDay = unixTimestampToDayDate(createdDate);

  for (const name of taskNames) {
    const task: ITaskItem = {
      id: uuid.v4(),
      name,
      type: 'task',
      completed: false,
      createdDate,
      dueDay,
    };
    taskMap[task.id] = task;
    taskIds.push(task.id);
  };

  return {
    taskMap,
    taskIds,
  };
}

export default function App() {
  const themeMode: IThemeMode = getLocalTheme(window.localStorage);
  document.body.classList.add(themeMode);
  setLocalTheme(window.localStorage, themeMode);

  const incompleteTasks: ITaskData = generateTaskItems([]);
  const completeTasks: ITaskData = generateTaskItems([]);

  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;

  return (
    <div className="app">
      <DndProvider backend={dndBackend}>
        <Tasks
          completeTasks={completeTasks} 
          incompleteTasks={incompleteTasks}
          themeMode={themeMode}
        />
      </DndProvider>
    </div>
  );
}


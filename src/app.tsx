import * as React from 'react';
import * as uuid from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Tasks } from './components/Tasks/Tasks';
import { unixTimestampToDayDate, isMobileDevice, getLocalTheme, setLocalTheme } from '../utils/baseUtils';
import { ITaskItem, IThemeMode } from '../types/baseTypes';

function generateFakeTaskItems(taskNames: string[]): ITaskItem[] {
  const createdDate = Date.now();
  const dueDay = unixTimestampToDayDate(createdDate);
  return taskNames.map((name, position) => {
    const task: ITaskItem = {
      id: uuid.v4(),
      name,
      type: 'task',
      completed: false,
      createdDate,
      dueDay,
      position,
    };
    return task;
  });
}

export default function App() {
  const themeMode: IThemeMode = getLocalTheme(window.localStorage);
  console.log(themeMode);
  document.body.classList.add(themeMode);
  setLocalTheme(window.localStorage, themeMode);

  const taskNames = ['Alter images', 'Bathe dog', 'Count backwards', 'Draw parallels', 'Eat noodles', 'Fight sleep'];
  const taskList = generateFakeTaskItems(taskNames);
  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;

  return (
    <div className="app">
      <DndProvider backend={dndBackend}>
        <Tasks taskList={taskList} themeMode={themeMode} />
      </DndProvider>
    </div>
  );
}


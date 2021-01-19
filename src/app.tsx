import * as React from 'react';
import * as uuid from 'uuid';
import { createContext } from 'react';
import { Router, Redirect, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { ErrorBoundaryPage } from './pages/ErrorBoundaryPage/ErrorBoundaryPage';
import { PrivateRoutePage } from './Pages/PrivateRoutePage/PrivateRoutePage';
import { TasksPage } from './Pages/TasksPage/TasksPage';
import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';
import { Header } from './components/Header/Header';

import firebase from '../config/firebase';
import {
  unixTimestampToDayDate,
  isMobileDevice,
  initThemeMode,
} from '../utils/baseUtils';
import { ITaskItem, ITaskMap, ITaskData, IUserAuthContext } from '../types/baseTypes';

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

const userAuthContext: IUserAuthContext = {
  userDef: undefined,
  db: firebase.firestore(),
  auth: firebase.auth(),
};

export const UserAuthContext = createContext<IUserAuthContext>(userAuthContext);

export default function App() {
  const history = createBrowserHistory();
  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;
  const themeMode = initThemeMode(window.localStorage);

  const incompleteTasks: ITaskData = generateTaskItems([]);
  const completeTasks: ITaskData = generateTaskItems([]);  

  return (
    <div className="app">
      <UserAuthContext.Provider value={userAuthContext}>
        <Router history={history}>
          <Header title="Get Shit Done" themeMode={themeMode} />
          <ErrorBoundaryPage>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <PrivateRoutePage from="/tasks" to="/">
              <DndProvider backend={dndBackend}>
                <TasksPage completeTasks={completeTasks} incompleteTasks={incompleteTasks} />
              </DndProvider>
            </PrivateRoutePage> */}
          </ErrorBoundaryPage>
        </Router>
      </UserAuthContext.Provider>
    </div>
  );
}



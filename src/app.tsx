import * as React from 'react';
import * as uuid from 'uuid';
import { createContext, useState } from 'react';
import { Router, Route } from 'react-router';
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
import { getLoggedInUser } from '../utils/authUtils';
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

type UserAuthContextGetAndSet = [
  IUserAuthContext,
  React.Dispatch<React.SetStateAction<IUserAuthContext>>,
];

export const UserAuthContext = createContext<null | UserAuthContextGetAndSet>(null);

const userMaybe = getLoggedInUser();
console.log({userMaybe});
export default function App() {
  const userAuthContext: IUserAuthContext = {
    userDef: undefined,
    db: firebase.firestore(),
    auth: firebase.auth(),
  };
  const [context, setContext] = useState(userAuthContext);

  const history = createBrowserHistory();
  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;
  const themeMode = initThemeMode(window.localStorage);

  const incompleteTasks: ITaskData = generateTaskItems([]);
  const completeTasks: ITaskData = generateTaskItems([]);  

  return (
    <div className="app">
      <UserAuthContext.Provider value={[context, setContext]}>
        <Router history={history}>
          <Header title="Get Shit Done" themeMode={themeMode} />
          <ErrorBoundaryPage>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoutePage from="/tasks" to="/login">
              <DndProvider backend={dndBackend}>
                <TasksPage completeTasks={completeTasks} incompleteTasks={incompleteTasks} />
              </DndProvider>
            </PrivateRoutePage>
          </ErrorBoundaryPage>
        </Router>
      </UserAuthContext.Provider>
    </div>
  );
}



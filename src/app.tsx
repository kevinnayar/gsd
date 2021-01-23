import * as React from 'react';
import { useState, useEffect } from 'react';
import * as uuid from 'uuid';
import { Router, Route, Redirect} from 'react-router';
import { createBrowserHistory } from 'history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import UserAuthContext, { initUserAuth } from './context/userAuthContext';
import { ErrorBoundaryPage } from './pages/ErrorBoundaryPage/ErrorBoundaryPage';
import { PrivateRoutePage } from './pages/PrivateRoutePage/PrivateRoutePage';
import { TasksPage } from './pages/TasksPage/TasksPage';
import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';
import { Header } from './components/Header/Header';

import { getUserDef } from '../utils/authUtils';
import {
  unixTimestampToDayDate,
  isMobileDevice,
  initThemeMode,
} from '../utils/baseUtils';
import { ITaskItem, ITaskMap, ITaskData } from '../types/baseTypes';

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

const history = createBrowserHistory();

export default function App() {
  const userAuthHook = useState(initUserAuth);
  const [userAuth, setUserAuth] = userAuthHook;

  useEffect(() => {
    userAuth.auth.onAuthStateChanged(async (user) => {
      if (
        user && user.uid && 
        (!userAuth.userDef || 
          (userAuth.userDef && userAuth.userDef.userId !== user.uid)
        )
      ) {
        const def = await getUserDef(userAuth.db, user.uid);
        if (def) {
          const { email, displayName, uid: userId } = user;
          const { firstName, lastName, roleType, createdAt } = def;
          const userDef = {
            email,
            firstName,
            lastName,
            displayName,
            roleType,
            createdAt,
            userId,
          };
          setUserAuth({ ...userAuth, userDef });
        }
      }
    });
  });

  
  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;
  const themeMode = initThemeMode(window.localStorage);

  const incompleteTasks: ITaskData = generateTaskItems([]);
  const completeTasks: ITaskData = generateTaskItems([]);  

  const routes = (
    <ErrorBoundaryPage>
      <Redirect from="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoutePage from="/tasks" to="/login">
        <DndProvider backend={dndBackend}>
          <TasksPage completeTasks={completeTasks} incompleteTasks={incompleteTasks} />
        </DndProvider>
      </PrivateRoutePage>
    </ErrorBoundaryPage>
  );

  return (
    <div className="app">
      <UserAuthContext.Provider value={userAuthHook}>
        <Router history={history}>
          <Header title="Get Shit Done" themeMode={themeMode} />
          {routes}
        </Router>
      </UserAuthContext.Provider>
    </div>
  );
}



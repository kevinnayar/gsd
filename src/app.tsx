import * as React from 'react';
import { useState, useEffect } from 'react';
import { Router, Route, Redirect} from 'react-router';
import { createBrowserHistory } from 'history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import UserAuthContext, { initUserAuth } from './context/userAuthContext';
import UserTasksContext, { initUserTasks } from './context/userTasksContext';

import { ErrorBoundaryPage } from './pages/ErrorBoundaryPage/ErrorBoundaryPage';
import { PrivateRoutePage } from './pages/PrivateRoutePage/PrivateRoutePage';
import { TasksPage } from './pages/TasksPage/TasksPage';

import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';

import { getUserDef } from '../utils/authUtils';
import { getUserTasks } from '../utils/taskUtils';
import { isMobileDevice, initThemeMode } from '../utils/baseUtils';

const history = createBrowserHistory();

export default function App() {
  const userAuthHook = useState(initUserAuth);
  const [userAuth, setUserAuth] = userAuthHook;

  const userTasksHook = useState(initUserTasks);
  const [, setUserTasks] = userTasksHook;

  useEffect(() => {
    userAuth.auth.onAuthStateChanged(async (user) => {
      if (
        user && user.uid && 
        (!userAuth.userDef || 
          (userAuth.userDef && userAuth.userDef.userId !== user.uid)
        )
      ) {
        const userDef = await getUserDef(userAuth.db, user.uid);
        if (userDef) {
          setUserAuth({ ...userAuth, userDef });
          const userTasks = await getUserTasks(userAuth.db, userDef.userId);
          setUserTasks(userTasks);
        }
      }
    });
  });

  const dndBackend = isMobileDevice() ? TouchBackend : HTML5Backend;
  const themeMode = initThemeMode(window.localStorage);

  const routes = (
    <ErrorBoundaryPage>
      <Redirect from="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoutePage from="/tasks" to="/login">
        <DndProvider backend={dndBackend}>
          <TasksPage />
        </DndProvider>
      </PrivateRoutePage>
    </ErrorBoundaryPage>
  );

  return (
    <div className="app">
      <UserAuthContext.Provider value={userAuthHook}>
        <UserTasksContext.Provider value={userTasksHook}>
          <Router history={history}>
            <Header title="Get Shit Done" themeMode={themeMode} />
            {routes}
          </Router>
        </UserTasksContext.Provider>
      </UserAuthContext.Provider>
    </div>
  );
}



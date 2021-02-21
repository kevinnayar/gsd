import * as React from 'react';
import { Router, Switch, Redirect } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { Provider } from 'react-redux';

import store from './store';

import { PublicRoute, PrivateRoute } from './routes';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthSignupPage from './pages/AuthSignupPage';
import AuthUpdatePasswordPage from './pages/AuthUpdatePasswordPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';

const history: History<any> = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Redirect from="/" to="/login" />
        <Switch>
          <PublicRoute exact path="/login" component={AuthLoginPage} />
          <PublicRoute exact path="/signup" component={AuthSignupPage} />
          <PublicRoute exact path="/auth" component={AuthUpdatePasswordPage} />
          <PrivateRoute exact path="/tasks" component={TasksPage} />
          <PrivateRoute exact path="/tasks/:taskId" component={TasksPage} />
          <PrivateRoute exact path="/me" component={ProfilePage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

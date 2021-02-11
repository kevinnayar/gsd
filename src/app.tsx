import * as React from 'react';
import { useEffect } from 'react';
import { Router, Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { Redirect, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { authCheck, authSetRedirect } from './store/auth/authActions';
import { AppReducer } from './types/baseTypes';

import AuthLoginPage from './pages/AuthLoginPage';
import AuthSignupPage from './pages/AuthSignupPage';
import TasksPage from './pages/TasksPage';

const PUBLIC_ROUTES = ['', '/', '/login', '/signup'];

const PublicRoute = ({ component: Component, ...rest }) => {  
  const { userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);

  if (userDef) {
    const pathname = PUBLIC_ROUTES.includes(redirectPathname) ? '/tasks' : redirectPathname;
    return <Redirect to={pathname} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const PrivateRoute = ({ component: Component, ...rest }) => {  
  const { userDef } = useSelector((state: AppReducer) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(authCheck());
    if (!userDef) dispatch(authSetRedirect(location.pathname));
  }, []);

  if (!userDef) return <Redirect to="/login" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const history: History<any> = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PublicRoute exact path="/login" component={AuthLoginPage} />
        <PublicRoute exact path="/signup" component={AuthSignupPage} />
        <PrivateRoute exact path="/tasks" component={TasksPage} />
        <PrivateRoute exact path="/tasks/:taskId" component={TasksPage} />
      </Router>
    </Provider>
  );
}

export default App;

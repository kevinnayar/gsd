import * as React from 'react';
import { useEffect } from 'react';
import { Router, Route, RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { Redirect, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { authCheck, authSetRedirect } from './store/auth/authActions';
import { AppReducer } from './types/baseTypes';

import PublicPage from './pages/PublicPages';
import PrivatePage from './pages/PrivatePage';
import { FormLogin } from './component-core/AuthForm/FormLogin';
import { FormSignup } from './component-core/AuthForm/FormSignup';

const PUBLIC_ROUTES = ['/login', '/signup'];

const PublicRoute = ({ component: Component, ...rest }) => {  
  const { userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);

  if (userDef) {
    const pathname = PUBLIC_ROUTES.includes(redirectPathname) ? '/tasks' : redirectPathname;
    return <Redirect to={pathname} />;
  }

  return (
    <Route {...rest} render={(props) => <PublicPage><Component {...props} /></PublicPage>} />
  );
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

  return (
    <Route {...rest} render={(props) => <PrivatePage><Component {...props} /></PrivatePage>} />
  );
};

const PrivateOne = React.memo((props: RouteComponentProps) => {
  return <div><p>private one</p></div>;
});

const PrivateTwo = React.memo((props: RouteComponentProps) => {
  return <div><p>private two</p></div>;
});

const history: History<any> = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PublicRoute exact path="/login" component={FormLogin} />
        <PublicRoute exact path="/signup" component={FormSignup} />
        <PrivateRoute exact path="/tasks" component={PrivateOne} />
        <PrivateRoute exact path="/tasks/:taskId" component={PrivateTwo} />
      </Router>
    </Provider>
  );
}

export default App;

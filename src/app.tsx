import * as React from 'react';
import { useEffect } from 'react';
import { Router, Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { Redirect, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import BasePageContainer from './containers/BasePageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import SignupPageContainer from './containers/SignupPageContainer';
import MainPageContainer from './containers/MainPageContainer';

import { authCheck, authSetRedirectPathname } from './store/auth/authActions';
import { AppReducer } from './types/baseTypes';

const PUBLIC_ROUTES = ['/login', '/signup'];

const PrivateRoute = ({ component, ...options }) => {  
  const { db, auth, userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => { dispatch(authCheck(db, auth)) }, []);

  if (!userDef && redirectPathname === null && !PUBLIC_ROUTES.includes(location.pathname)) {
    dispatch(authSetRedirectPathname(location.pathname));
  }

  if (!userDef) return <Redirect to="/login" />;

  return <Route component={component} {...options} />;
};

const history: History<any> = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <BasePageContainer>
          <Route exact path="/login" component={LoginPageContainer} />
          <Route exact path="/signup" component={SignupPageContainer} />
          <PrivateRoute exact path="/tasks" component={MainPageContainer} />
          <PrivateRoute exact path="/tasks/:id" component={MainPageContainer} />
        </BasePageContainer>
      </Router>
    </Provider>
  );
}

export default App;

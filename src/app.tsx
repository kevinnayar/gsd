import * as React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { Provider } from 'react-redux';

import store from './store';
import BasePageContainer from './containers/BasePageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import SignupPageContainer from './containers/SignupPageContainer';
import MainPageContainer from './containers/MainPageContainer';

const history: History<any> = createBrowserHistory();

function App() {
  const { auth, db } = store.getState().auth;
  return (
    <Provider store={store}>
      <Router history={history}>
        <BasePageContainer auth={auth} db={db}>
          <Route exact path="/login" component={LoginPageContainer} />
          <Route exact path="/signup" component={SignupPageContainer} />
          <Route exact path="/tasks" component={MainPageContainer} />
          <Route exact path="/tasks/:id" component={MainPageContainer} />
        </BasePageContainer>
      </Router>
    </Provider>
  );
}

export default App;

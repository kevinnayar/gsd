import * as React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import store from './store';
import BasePageContainer from './containers/BasePageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import SignupPageContainer from './containers/SignupPageContainer';
import HomePageContainer from './containers/HomePageContainer';

import { isMobileDevice } from '../utils/baseUtils';

const history: History<any> = createBrowserHistory();

function App() {
  const { auth, db } = store.getState().auth;
  const dndBackend = isMobileDevice() ? HTML5Backend : TouchBackend;

  return (
    <Provider store={store}>
      <Router history={history}>
        <DndProvider backend={dndBackend}>
          <BasePageContainer auth={auth} db={db}>
            <Route exact path="/login" component={LoginPageContainer} />
            <Route exact path="/signup" component={SignupPageContainer} />
            <Route exact path="/home" component={HomePageContainer} />
          </BasePageContainer>
        </DndProvider>
      </Router>
    </Provider>
  );
}

export default App;

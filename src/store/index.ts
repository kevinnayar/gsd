import { applyMiddleware, createStore, compose, Store, combineReducers, Reducer } from 'redux';
import thunk from 'redux-thunk';

import auth, { initialState as authState } from './auth/authReducer';
import tasks, { initialState as tasksState } from './tasks/tasksReducer';
import taskDocs, { initialState as taskDocsState } from './taskDocs/taskDocsReducer';

import { AUTH_LOGOUT_SUCCEEDED } from '../types/authTypes';
import { AppReducer, AppDispatch } from '../types/baseTypes';

const appReducer: Reducer<AppReducer, AppDispatch> = combineReducers({
  auth,
  tasks,
  taskDocs,
});

const rootReducer = (state: AppReducer, action: AppDispatch) => {
  if (action.type === AUTH_LOGOUT_SUCCEEDED) {
    const resetState = {
      auth: authState,
      tasks: tasksState,
      taskDocs: taskDocsState,
    };
    return resetState;
  }

  return appReducer(state, action);
};

const middleware = [
  applyMiddleware(thunk),
  ...(process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()]
    : []),
];

const store: Store<AppReducer, AppDispatch> = createStore(rootReducer, compose(...middleware));

export default store;

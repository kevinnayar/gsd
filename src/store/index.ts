import { applyMiddleware, createStore, compose, Store, combineReducers, Reducer } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth/authReducer';
import tasks from './tasks/tasksReducer';
import taskDocs from './taskDocs/taskDocsReducer';
import { AppReducer, AppDispatch } from '../types/baseTypes';

const reducers: Reducer<AppReducer, AppDispatch> = combineReducers({
  auth,
  tasks,
  taskDocs,
});

const middleware = [
  applyMiddleware(thunk),
  ...(process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()]
    : []),
];

const store: Store<AppReducer, AppDispatch> = createStore(reducers, compose(...middleware));

export default store;

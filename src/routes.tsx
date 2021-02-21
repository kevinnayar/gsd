import * as React from 'react';
import { useEffect } from 'react';
import { Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { authCheck, authSetRedirect } from './store/auth/authActions';
import { AppReducer } from './types/baseTypes';

const PUBLIC_ROUTES = ['/login', '/signup', '/auth'];

export const PublicRoute = ({ component: Component, ...rest }) => {  
  const { userDef, redirectPathname } = useSelector((state: AppReducer) => state.auth);

  if (userDef) {
    let pathname = PUBLIC_ROUTES.includes(redirectPathname) ? '/tasks' : redirectPathname;
    if (['', '/'].includes(pathname)) pathname = '/login';
    return <Redirect to={pathname} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const PrivateRoute = ({ component: Component, ...rest }) => {  
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


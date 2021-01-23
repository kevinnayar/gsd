import * as React from 'react';
import { useContext } from 'react';
import UserAuthContext from '../../context/userAuthContext';
import { Redirect } from 'react-router';

type PrivateRouteProps = {
  from: string,
  to: string,
  children: any,
};

export function PrivateRoutePage(props: PrivateRouteProps) {
  const [userAuth] = useContext(UserAuthContext);
  return (userAuth.userDef)
    ? <>{props.children}</>
    : <Redirect from={props.from} to={props.to} />;
}



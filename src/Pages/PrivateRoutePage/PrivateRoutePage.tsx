import * as React from 'react';
import { useContext } from 'react';
import { UserAuthContext } from '../../app';
import { Redirect } from 'react-router';

type PrivateRouteProps = {
  from: string,
  to: string,
  children: any,
};

export function PrivateRoutePage(props: PrivateRouteProps) {
  const userMaybe = useContext(UserAuthContext);
  return (userMaybe) 
    ? <>{props.children}</>
    : <Redirect from={props.from} to={props.to} />;
}



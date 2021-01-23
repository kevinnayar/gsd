import * as React from 'react';
import { db, auth } from '../../config/firebase';
import { IUserAuthContext } from '../../types/baseTypes';

export const initUserAuth: IUserAuthContext = {
  userDef: undefined,
  db,
  auth,
};

export default React.createContext<[IUserAuthContext, React.Dispatch<React.SetStateAction<IUserAuthContext>>]>([
  initUserAuth,
  () => {},
]);


import * as React from 'react'

import PublicPage from './PublicPage';
import { AuthForm } from '../components/AuthForm/AuthForm';
import { FormUpdatePassword } from '../components/AuthForm/FormUpdatePassword';

const AuthLoginPage = React.memo(() => {
  return (
    <PublicPage>
      <AuthForm hideNav>
        <FormUpdatePassword />
      </AuthForm>
    </PublicPage>
  );
});

export default AuthLoginPage;


import * as React from 'react'

import PublicPage from './PublicPage';
import { AuthForm } from '../components/AuthForm/AuthForm';
import { FormLogin } from '../components/AuthForm/FormLogin';

const AuthLoginPage = React.memo(() => {
  return (
    <PublicPage>
      <AuthForm>
        <FormLogin />
      </AuthForm>
    </PublicPage>
  );
});

export default AuthLoginPage;


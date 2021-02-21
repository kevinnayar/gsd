import * as React from 'react';

import PublicPage from './PublicPage';
import AuthForm from '../components/AuthForm/AuthForm';
import FormSignup from '../components/AuthForm/FormSignup';

const AuthSignupPage = React.memo(() => {
  return (
    <PublicPage>
      <AuthForm showNav>
        <FormSignup />
      </AuthForm>
    </PublicPage>
  );
});

export default AuthSignupPage;
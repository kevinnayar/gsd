import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { History } from 'history';

import firebase from '../../config/firebase';
import { Header } from '../components/Header/Header';
import { authCheck, authLogout } from '../store/auth/authActions';
import { extractError } from '../../utils/baseUtils';
import { UserDef } from '../../types/authTypes';
import { AppReducer } from '../../types/baseTypes';

type BasePageProps = {
  location: { pathname: string },
  history: History,
  userDef: null | UserDef,
  children: any,
  authCheck: () => void,
  authLogout: () => void,
};

type ErrorInfo = {
  componentStack: string,
};

type BasePageState = {
  userDef: null | UserDef,
  error: void | Error,
  errorInfo: void | ErrorInfo,
};

const PUBLIC_ROUTES = ['/login', '/signup'];

export class BasePage extends React.Component<BasePageProps, BasePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: undefined,
      errorInfo: undefined,
      userDef: props.userDef,
    };
  }

  componentDidMount = async () => {
    this.props.authCheck();
  }

  componentDidUpdate = (prevProps: BasePageProps) => {
    if (prevProps.userDef !== this.props.userDef) {
      this.setState({ 
        userDef: this.props.userDef,
      });
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { userDef, error } = this.state;
    const { authLogout, location } = this.props;
    const { pathname } = location;

    if (!PUBLIC_ROUTES.includes(pathname) && !userDef) return <Redirect to='/login' />;
    
    if (PUBLIC_ROUTES.includes(pathname) && userDef) return <Redirect to='/home' />;

    const getClassName = (prefix: string) => `${prefix} ${error ? `${prefix}--error` : ''}`;

    return (
      <div className={getClassName('app')}>
        <Header
          className={getClassName('app__header')}
          userDef={userDef}
          logout={authLogout}
        />
        <div className={getClassName('app__body')}>
          {!error
            ? this.props.children
            : <p className="error">{extractError(error)}</p>
          }
        </div>
      </div>
    );
  }
}

type BaseOwnProps = {
  auth: firebase.auth.Auth,
  db: firebase.firestore.Firestore,
  children: any,
};

function mapStateToProps(state: AppReducer) {
  return {
    userDef: state.auth.userDef,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>, ownProps: BaseOwnProps) {
  return {
    authCheck: () => dispatch(authCheck(ownProps.db, ownProps.auth)),
    authLogout: () => dispatch(authLogout(ownProps.auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasePage));



import * as React from 'react';
import { Link } from 'react-router-dom';

type ErrorInfo = {
  componentStack: string,
};

type ErrorProps = {
  children: any;
};

type ErrorState = {
  error: void | Error;
  errorInfo: void | ErrorInfo;
};

export class ErrorBoundaryPage extends React.Component<ErrorProps, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
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
    return (
      <div className="app__body">
        {this.state.error
          ? <h2 style={{ marginTop: 100 }}>Whoops... something went wrong. Go back <Link to="/home">home</Link>.</h2>
          : this.props.children
        }
      </div>
    );
  }
}



import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import CompCartDialog from './components/CompCartDialog';
import CompFooterNav from './components/CompFooterNav';
import CompLoginDialog from './components/CompLoginDialog';
import CompRegisterDialog from './components/CompRegisterDialog';
import CompTopNavBar from './components/CompTopNavBar';
import { actionGetCategories } from './models/actions';
import HomePage from './routers/HomePage';
import ProductPage from './routers/ProductPage';
import SearchPage from './routers/SearchPage';

interface IAppProps extends DispatchProp, RouteComponentProps {}

class App extends Component<IAppProps> {
  public componentWillMount () {
    this.props.dispatch(actionGetCategories());
  }

  public componentDidUpdate (prevProps: IAppProps) {
    const locationChanged = this.props.location !== prevProps.location;
    if (locationChanged) {
      window.scrollTo(0, 0);
    }
  }

  public render () {
    return (
      <Container className='border-left border-right p-0'>
        <CompTopNavBar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/product/:id' component={ProductPage} />
        <Route exact path='/search' component={SearchPage} />
        <CompFooterNav />
        <CompLoginDialog />
        <CompRegisterDialog />
        <CompCartDialog />
      </Container>
    );
  }
}

export default withRouter(connect()(App));

import React, { Component } from 'react';

import { connect, DispatchProp } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import FooterNav from './components/FooterNav';
import { TopNavBar } from './components/TopNavBar';
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
      <div className='App'>
        <TopNavBar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/product/:id' component={ProductPage} />
        <Route exact path='/search' component={SearchPage} />
        <FooterNav />
      </div>
    );
  }
}

export default withRouter(connect()(App));

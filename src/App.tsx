import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { Route } from 'react-router-dom';
import FooterNav from './components/FooterNav';
import JumboTron from './components/JumboTron';
import { TopNavBar } from './components/TopNavBar';
import { actionGetCategories } from './models/actions';
import HomePage from './routers/HomePage';
import ProductPage from './routers/ProductPage';
class App extends Component<DispatchProp> {
  public componentWillMount () {
    this.props.dispatch(actionGetCategories());
  }
  public render () {
    return (
      <div className='App'>
        <TopNavBar />

        <Route exact path='/' component={HomePage} />
        <Route exact path='/product/:id' component={ProductPage} />

        <FooterNav />
      </div>
    );
  }
}

export default connect()(App);

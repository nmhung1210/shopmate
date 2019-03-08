import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import FooterNav from './components/FooterNav';
import JumboTron from './components/JumboTron';
import { TopNavBar } from './components/TopNavBar';
import HomePage from './routers/HomePage';
import ProductPage from './routers/ProductPage';
class App extends Component {
  public render () {
    return (
      <div className='App'>
        <TopNavBar />
        <JumboTron />
        <Container className='pageContainer'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/product/:id' component={ProductPage} />
        </Container>
        <FooterNav />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import {api} from './apis';
class App extends Component {
  public render () {
    console.log(api);
    return (
      <div className='App'>
        <header className='App-header'>
        </header>
      </div>
    );
  }
}

export default App;

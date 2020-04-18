import React, { Component } from 'react';
import Router from './Router';
import GlobalStyles from './GlobalStyles';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        <Router />
      </React.Fragment>
    )
  }
}

export default App;

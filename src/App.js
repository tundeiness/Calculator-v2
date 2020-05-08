/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import Bottom from './component/ButtonPanel';
import Top from './component/OperatorPanel';
import Display from './component/Display';
import Computation from './helper/computation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childDisplay: '0',
      operandOne: null,
      next: false,
      operator: null,
    };
  }

  render() {
    const { childDisplay } = this.state;
    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} />
        <Top />
        <Bottom />
      </div>
    );
  }
}

export default App;

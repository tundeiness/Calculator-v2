/* eslint-disable max-len */
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
    this.handleOperator = this.handleOperator.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleOperator(e) {
    const input = e.currentTarget.value;
    const {
      operandOne, childDisplay, operator, next,
    } = this.state;
    const suppliedValue = parseFloat(childDisplay);

    if (operator && next) {
      this.setState({ operator: input });
    }

    if (operandOne === null) {
      this.setState({ operandOne: suppliedValue });
    } else if (operator) {
      const currVal = operandOne || 0;
      const res = Computation[operator](currVal, suppliedValue);
      this.setState({
        childDisplay: String(res),
        operandOne: res,
      });
    }
    this.setState({ next: true, operator: input });
  }

  handleInput(e) {
    const input = e.currentTarget.value;
    let { childDisplay, next } = this.state;
    if (next === true) {
      this.setState({ childDisplay: input, next: false });
    } else if (childDisplay === '0') {
      this.setState({ childDisplay: input });
    } else {
      this.setState({ childDisplay: childDisplay += input });
    }
  }

  handleDecimal(e) {
    const input = e.currentTarget.value;
    let { childDisplay } = this.state;
    if (!childDisplay.includes(input)) {
      this.setState({ childDisplay: childDisplay += input });
    }
  }

  handleReset(e) {
    // if key pressed is AC reset
    const input = e.currentTarget.value;
    // let {
    //   operandOne, childDisplay, operator, next,
    // } = this.state;
    // operandOne = null;
    // childDisplay = '0';
    // next = false;
    // operator = null;
    if (input === 'all-clear') {
      this.setState({
        childDisplay: '0',
        operandOne: null,
        next: false,
        operator: null,
      });
    }
  }

  render() {
    const { childDisplay } = this.state;
    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} handleDecimal={this.handleDecimal} handleReset={this.handleReset} />
        <Top handleReset={this.handleReset} handleOperator={this.handleOperator} handleInput={this.handleInput} handleDecimal={this.handleDecimal} />
        <Bottom handleOperator={this.handleOperator} handleInput={this.handleInput} />
      </div>
    );
  }
}

export default App;

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

  handleOperator(nextOperator) {
    const {
      operandOne, childDisplay, operator, next,
    } = this.state;
    const suppliedValue = parseFloat(childDisplay);

    if (operator && next) {
      this.setState({ operator: nextOperator });
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
    this.setState({ next: true, operator: nextOperator });
  }

  handleInput(ele) {
    let { childDisplay } = this.state;
    if (childDisplay === '0') {
      this.setState({ childDisplay: ele });
    } else {
      this.setState({ childDisplay: childDisplay += ele });
    }
  }

  handleDecimal(period) {
    let { childDisplay } = this.state;
    if (childDisplay.includes(period)) {
      this.setState({ childDisplay: childDisplay += period });
    }
  }

  handleReset() {
    let {
      operandOne, childDisplay, operator, next,
    } = this.state;
    operandOne = null;
    childDisplay = '0';
    next = false;
    operator = null;
    this.setState({
      childDisplay,
      operandOne,
      next,
      operator,
    });
  }

  render() {
    const { childDisplay } = this.state;
    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} handleDecimal={this.handleDecimal} />
        <Top handleReset={this.handleReset} handleOperator={this.handleOperator} handleInput={this.handleInput} handleDecimal={this.handleDecimal} />
        <Bottom handleOperator={this.handleOperator} handleInput={this.handleInput} />
      </div>
    );
  }
}

export default App;

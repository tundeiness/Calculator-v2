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

  handleOperator(rightOperand, nextOperator) {
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

  handleInput(e) {
    // const input = e.currentTarget.value;
    // this.setState({ childDisplay: input });
    let { childDisplay, next } = this.state;
    if (next === true) {
      this.setState({ childDisplay: e, next: false });
    } else if (childDisplay === '0') {
      this.setState({ childDisplay: e });
    } else {
      this.setState({ childDisplay: childDisplay += e });
    }
  }

  handleDecimal(e) {
    // const input = e.currentTarget.value;
    this.setState({ childDisplay: e });
    const { childDisplay } = this.state;
    if (!childDisplay.includes(e)) {
      this.setState({ childDisplay: `${childDisplay}.`, next: false });
    }
  }


  handleReset(e) {
    // if key pressed is AC reset
    // const input = e.currentTarget.value;
    // let {
    //   operandOne, childDisplay, operator, next,
    // } = this.state;
    // operandOne = null;
    // childDisplay = '0';
    // next = false;
    // operator = null;
    if (e === 'all-clear') {
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

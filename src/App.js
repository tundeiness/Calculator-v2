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
    this.getInput = this.getInput.bind(this);
  }


  getInput(e) {
    const currVal = e.currentTarget.className;
    console.log(currVal);
    if (currVal === 'operator') {
      this.handleOperator(e.target.value);
      this.setState({ childDisplay: e.target.value });
    }

    if (currVal === 'decimal') {
      this.handleDecimal(e.target.value);
      this.setState({ childDisplay: e.target.value });
    }

    if (currVal === 'all-clear') {
      this.handleReset();
      return;
    }

    this.handleInput(e.target.value);
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


  handleInput(e) {
    const { childDisplay, next } = this.state;
    if (next === true) {
      this.setState({ childDisplay: e, next: false });
    } else if (childDisplay === '0') {
      this.setState({ childDisplay: e });
    } else {
      this.setState({ childDisplay: childDisplay + e });
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


  handleReset() {
    this.setState({
      childDisplay: '0',
      operandOne: null,
      next: false,
      operator: null,
    });
  }


  render() {
    const { childDisplay } = this.state;
    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} getInput={this.getInput} />
        <Top handleReset={this.handleReset} getInput={this.getInput} />
        <Bottom getInput={this.getInput} />
      </div>
    );
  }
}

export default App;

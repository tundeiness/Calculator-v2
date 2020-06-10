
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
      calculatorState: "INIT",
      possibleStates: ["INIT", "CAPTURED_FIRST", "CAPTURED_OPERATOR", "CAPTURED_SECOND"],
      operators: ["+", "-", "*", "=", "/"],
      childDisplay: '0',
      firstOperand: null,
      secOperand: null,
      nextOperand: false,
      operatorType: null,
      characterLen: 10,
    };
  }


  getInput(e) {
    console.log(this.state)
    const val = e?.target?.value || new Error("Could not capture input");
    const isOperator = this.state.operators.includes(val);
    
    if (this.state.calculatorState === "INIT" && !isOperator) {
      this.state.calculatorState = "CAPTURED_FIRST"
      return this.state.firstOperand = val;
    }

    if (this.state.calculatorState === "INIT") {
      return
    }

    if(this.state.calculatorState === "CAPTURED_FIRST") {
      this.setState()
      return this.state.firstOperand = `${this.state.firstOperand}${val}`;
    }

    if(this.state.isOperator === true) {
      this.state.calculatorState = "CAPTURED_OPERATOR";
      return this.state.operatorType = val
    }

    if(this.state.calculatorState === "CAPTURED_OPERATOR") {
      this.state.calculatorState = "CAPTURED_SECOND";
      return this.state.secOperand = val
    }

    if(this.state.calculatorState === "CAPTURED_SECOND") {
      return this.state.secOperand = `${this.state.secOperand}${val}`
    }
  }


  render() {
    const {
      childDisplay,
      firstOperand,
      operatorType,
    } = this.state;
    // const trial = this.getValue.current.value
    console.log('value in render =>', childDisplay);
    console.log('operand =>', firstOperand);
    console.log('ops =>', operatorType);


    return (
      <div className="app-wrapper">
        <Display ref={this.getValue} childDisplay={childDisplay} getInput={this.getInput} />
        <Top getInput={this.getInput} toggleButton={this.toggleButton} />
        <Bottom getInput={this.getInput} toggleButton={this.toggleButton} />
      </div>
    );
  }
}

export default App;

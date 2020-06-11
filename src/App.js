
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import Bottom from './component/ButtonPanel';
import Top from './component/OperatorPanel';
import Display from './component/Display';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatorState: "INIT",
      possibleStates: ["INIT", "CAPTURED_FIRST", "CAPTURED_OPERATOR", "CAPTURED_SECOND", "GOT_RESULT"],
      operators: ["+", "-", "*", "=", "/"],
      childDisplay: '0',
      firstOperand: null,
      secOperand: null,
      nextOperand: false,
      operatorType: null,
      characterLen: 10,
    };

    this.getInput = this.getInput.bind(this);
  }

  async getInput(e) {
    const val = e?.target?.value || new Error("Could not capture input");
    
    if (val === "ac") return this.resetCalc();
    const localState = { ...this.state };
    const isOperator = localState.operators.includes(val);

    if (localState.calculatorState === "INIT" && !isOperator) {
      localState.calculatorState = "CAPTURED_FIRST"
      localState.firstOperand = val;
      localState.childDisplay = localState.firstOperand;

      this.setState(localState)
      return
    }

    if (localState.calculatorState === "CAPTURED_FIRST" && !isOperator) {
      localState.firstOperand = this.valGenerator(val, localState.firstOperand);
      localState.childDisplay = localState.firstOperand;

      this.setState(localState)
      return
    }

    if (isOperator) {
      // if (localState.calculatorState === "GOT_RESULT" && val === "=") {
      //   return;
      // }
      if (localState.calculatorState === "CAPTURED_OPERATOR") {
        localState.operatorType = val
        this.setState(localState)
        return
      }
      if (localState.calculatorState === "CAPTURED_SECOND") {
        localState.firstOperand = this.calc(localState.firstOperand, localState.secOperand, localState.operatorType);
        localState.childDisplay = localState.firstOperand;
        localState.secOperand = null;
        localState.calculatorState = "GOT_RESULT";
        localState.operatorType = val;
      } else if (localState.calculatorState === "CAPTURED_OPERATOR" && localState.secOperand) {
        localState.firstOperand = this.calc(localState.firstOperand, localState.secOperand, localState.operatorType)
        localState.secOperand = null;
        localState.calculatorState = "GOT_RESULT";
        localState.childDisplay = localState.firstOperand;
        localState.operatorType = val
      }
      else {
        localState.calculatorState = "CAPTURED_OPERATOR";
        localState.operatorType = val;
      }
      this.setState(localState)
      return
    }

    if (localState.calculatorState === "CAPTURED_OPERATOR" || localState.calculatorState === "GOT_RESULT") {
      if(!localState.operatorType || localState.operatorType === "=") {
        return this.resetCalc(val)
      }
      localState.secOperand = this.valGenerator(val, localState.secOperand)
      localState.calculatorState = "CAPTURED_SECOND";
      localState.childDisplay = localState.secOperand;

      this.setState(localState)
      return
    }

    if (localState.calculatorState === "CAPTURED_SECOND") {
      if(!localState.operatorType || localState.operatorType === "=") {
        return this.resetCalc(val)
      }
      localState.secOperand = this.valGenerator(val, localState.secOperand)
      localState.childDisplay = localState.secOperand;
      this.setState(localState)
      return
    }

  }

  calc(x, y, opr) {
    console.log(x, y, opr)
    if (!y) x = y;
    switch (opr) {
      case "+":
        return Number(x) + Number(y)
      case "-":
        return Number(x) - Number(y)
      case "*":
        return Number(x) * Number(y)
      case "/":
        return Number(x) / Number(y)
      default:
        return 0;
    }
  }

  valGenerator(val, prevVal) {
    if (val === "." && !prevVal) return "0."
    if (val === "." && prevVal && !prevVal.includes(val)) return `${prevVal}.`
    if (val === "." && prevVal && prevVal.includes(val)) return prevVal
    if (val !== "." && prevVal) return `${prevVal}${val}`
    if (val && !prevVal) return val
    return prevVal
  }

  resetCalc(newFirstOperand = null) {
    console.log("RESETTING CALC")
    const localState = this.state;
    localState.secOperand = null;
    localState.firstOperand = newFirstOperand;
    localState.operatorType = null;
    localState.calculatorState = "INIT";
    localState.childDisplay = newFirstOperand || "0";
    this.setState(localState);
  }


  render() {
    const {
      childDisplay,
    } = this.state;

    console.log(JSON.stringify(this.state, null, 2))

    return (
      <div className="app-wrapper">
        <Display ref={this.getValue} childDisplay={childDisplay} />
        <Top getInput={this.getInput} toggleButton={this.toggleButton} />
        <Bottom getInput={this.getInput} toggleButton={this.toggleButton} />
      </div>
    );
  }
}

export default App;

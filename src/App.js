
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import Bottom from './component/ButtonPanel';
import Top from './component/OperatorPanel';
import Display from './component/Display';
// import Computation from './helper/computation';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childDisplay: '0',
      firstOperand: null,
      nextOperand: false,
      operatorType: null,
      characterLen: 10,
      isOperator: false,
    };

    this.getInput = this.getInput.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    this.getValue = React.createRef();
  }


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');


    const refVal = this.getValue.current.value;


    let {
      childDisplay, firstOperand, nextOperand, isOperator,
    } = this.state;

    let { operatorType } = this.state;
    const { characterLen } = this.state;

    if (childDisplay === '0' && currVal === 'number') {
      this.setState(() => {
        childDisplay = value;
        return {
          childDisplay,
        };
      });
    }


    if (childDisplay !== '0' && currVal === 'number') {
      this.setState((state) => {
        childDisplay = state.childDisplay + value;
        return {
          childDisplay,
        };
      });
    }

    if (currVal === 'decimal' && !childDisplay.includes('.')) {
      this.setState((state) => {
        childDisplay = `${state.childDisplay}.`;
        return {
          childDisplay,
        };
      });
    }

    // in line 77 at the click of an operator the first operand is stored in firstOperand

    if (attribute === 'add' || attribute === 'subtract' || attribute === 'multiply' || attribute === 'divide') {
      this.setState(() => {
        firstOperand = refVal;
        operatorType = attribute;
        childDisplay = refVal;
        nextOperand = true;
        return {
          firstOperand, operatorType, childDisplay, nextOperand,
        };
      });
    }

    // in line 93 if the app is expecting a second operand (i.e true) and the
    // user presses a number key permit the input of a second operand without
    // concatenating with the firstoperand i.e start afresh

    if (nextOperand && currVal === 'number') {
      this.setState(() => {
        nextOperand = false;
        childDisplay = value;
        return {
          nextOperand,
          childDisplay,
        };
      });
    }

    // when do you start the first operation? what will kick start the first operation


    if (attribute === 'all-clear') {
      this.handleAllClear();
    }
  }


  handleAllClear() {
    this.setState({
      childDisplay: '0',
      firstOperand: null,
      secOperand: null,
      nextOperand: false,
      operatorType: null,
    });
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

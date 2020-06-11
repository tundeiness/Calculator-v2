
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import Bottom from './component/ButtonPanel';
import Top from './component/OperatorPanel';
import Display from './component/Display';
// import Computation from './helper/computation';
import Computation from './helper/computation';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childDisplay: '0',
      firstOperand: null,
      result: 0,
      secOperand: null,
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
      childDisplay, firstOperand, nextOperand, isOperator, secOperand, result,
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

    if (currVal === 'decimal') {
      if (!childDisplay.includes('.')) {
        this.setState((state) => {
          childDisplay = `${state.childDisplay}.`;
          return {
            childDisplay,
          };
        });
      }
    }


    // in line 77 at the click of an operator the first operand is stored in firstOperand

    if (attribute === 'add' || attribute === 'subtract' || attribute === 'multiply' || attribute === 'divide') {
      if (firstOperand === null) {
        const retValue = parseFloat(childDisplay);
        this.setState(() => {
          firstOperand = retValue;
          operatorType = attribute;
          nextOperand = true;
          return {
            firstOperand, operatorType, childDisplay, nextOperand,
          };
        });
      }
    }

    // set display to zero if the display has a number and an ending decimal and
    // if the user presses the opertor button.
    if (childDisplay.slice(-1) === '.') {
      if (attribute === 'add' || attribute === 'subtract' || attribute === 'multiply' || attribute === 'divide') {
        this.setState((state) => {
          childDisplay = `${state.childDisplay}0`;
          return {
            childDisplay,
          };
        });
      }
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

    if (firstOperand !== null && operatorType !== null) {
      if (attribute === 'add' || attribute === 'subtract' || attribute === 'multiply' || attribute === 'divide') {
        this.setState(() => {
          const recentValue = parseFloat(childDisplay);
          secOperand = recentValue;
          const res = Computation(firstOperand, operatorType, secOperand);
          result = res;
          firstOperand = String(res);
          childDisplay = firstOperand;
          secOperand = null;
          return {
            firstOperand, childDisplay, secOperand,
          };
        });

        this.setState(() => {
          operatorType = null;
          return { secOperand, operatorType, childDisplay };
        });
      }
    }

    // when do you start the first operation? what will kick start the first
    // operation


    // if operator equals is pressed by user and if 2 operand exist and an
    // operator compute and display result
    // else do nothing. retain current value displayed
    if (attribute === 'calculate') {
      if (firstOperand !== null && operatorType !== null) {
        const recentValue = parseFloat(refVal);
        secOperand = recentValue;
        // nextOperand = false;
        const res = Computation(firstOperand, operatorType, secOperand);
        firstOperand = String(res);
        // childDisplay = String(res);
        this.setState(() => {
          secOperand = null;
          return secOperand;
        });
        this.setState({ childDisplay: String(res), nextOperand: false });
      // this.setState(() => {
      //   secOperand = recentValue;
      //   nextOperand = false;
      //   const res = Computation(firstOperand, operatorType, secOperand);
      //   childDisplay = String(res);
      //   secOperand = null;
      //   return {
      //     childDisplay, nextOperand, secOperand,
      //   };
      // });
      }
    }


    // fixing a bug that occurs when user selects a number followed
    // by an operator and then calculate button. It should return 0
    // if (firstOperand !== null && operatorType !== null && attribute === 'calculate') {
    //   // if (operatorType !== null && attribute === 'calculate') {
    //   // this.setState({ childDisplay: '0' });
    //   this.handleAllClear();
    //   // }
    // }


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

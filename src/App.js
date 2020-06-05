
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
      firstOperand: null,
      secOperand: null,
      nextOperand: false,
      operatorType: null,
      characterLen: 10,
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
      childDisplay, firstOperand, nextOperand, secOperand,
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


    if (attribute === 'add' || attribute === 'multiply' || attribute === 'subtract' || attribute === 'divide') {
      if (childDisplay !== '0') {
        this.setState(() => {
          firstOperand = parseFloat(refVal);
          operatorType = attribute;
          nextOperand = true;
          return {
            nextOperand,
            firstOperand,
            operatorType,
          };
        });
      }
    }


    if (nextOperand) {
      this.setState(() => {
        childDisplay = value;
        nextOperand = false;
        return {
          childDisplay,
          nextOperand,
        };
      });
    }

    // TODO  line 113 to 127 has a wierd behaviour. After an operand  is
    // selected and assuming I clicked an operator after the operand. and its
    // not the operator i want. but I still go ahead and select the prefered
    // operator, but on click of the preffered operator the operand computes
    // based on the previous operator and yields a result instead of nothing.
    // for example the first number I clicked is 5 and the next operator is say
    // add but I changed my mind and selected multiply. Instead of nothing to
    // happen it produces a result based on the previous operator and using the
    // values on the display. That is wierd and needs to be fixed.

    if (firstOperand !== null && refVal) {
      if (attribute === 'add' || attribute === 'multiply' || attribute === 'subtract' || attribute === 'divide') {
        const recentValue = parseFloat(refVal);
        const res = Computation(firstOperand, operatorType, recentValue);
        this.setState(() => {
          firstOperand = res;
          const display = String(res);
          childDisplay = display.substring(0, characterLen);
          return {
            firstOperand,
            childDisplay,
          };
        });
      }
    }


    if (attribute === 'calculate') {
      const recentValue = parseFloat(refVal);
      const res = Computation(firstOperand, operatorType, recentValue);
      this.setState(() => {
        firstOperand = res;
        const display = String(res);
        childDisplay = display.substring(0, characterLen);
        return {
          firstOperand,
          childDisplay,
        };
      });
    }


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

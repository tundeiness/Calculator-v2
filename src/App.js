
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

    // const prevAtt = e.currentTarget.getAttribute('data-previous');

    const refVal = this.getValue.current.value;


    let {
      childDisplay, firstOperand, nextOperand,
    } = this.state;

    let { operatorType } = this.state;
    const { characterLen } = this.state;


    // const { store } = this.state;

    // const { status } = this.state;

    // const conver = parseFloat(value);

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

    // if (childDisplay.length > characterLen) {
    //   const str = childDisplay.substring(0, characterLen);
    //   childDisplay = str;
    //   this.setState(() => ({
    //     childDisplay,
    //   }));
    // }


    if (attribute === 'all-clear') {
      this.handleAllClear();
    }
  }


  handleAllClear() {
    this.setState({
      childDisplay: '0',
      firstOperand: null,
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

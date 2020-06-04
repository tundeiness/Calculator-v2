
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import Bottom from './component/ButtonPanel';
import Top from './component/OperatorPanel';
import Display from './component/Display';
// import storage from 'local-storage';
import Computation from './helper/computation';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childDisplay: '0',
      firstOperand: null,
      nextOperand: false,
      operatorType: null,
      // store: [],
      // initial: '0',
      // next: '0',
      // status: 'first',
    };

    this.getInput = this.getInput.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    // this.onAddValues = this.onAddValues.bind(this);
    // this.handleCalculate = this.handleCalculate.bind(this);
    this.getValue = React.createRef();
    // this.updateOperator = this.updateOperator.bind(this);
  }


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');

    // const prevAtt = e.currentTarget.getAttribute('data-previous');

    const refVal = this.getValue.current.value;


    let {
      childDisplay, firstOperand, nextOperand, operatorType,
    } = this.state;


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
          nextOperand = true;
          return {
            nextOperand,
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

    // (attribute === 'add' || attribute === 'multiply' || attribute === 'divide' || attribute === 'divide')
  }


  handleAllClear() {
    this.setState({
      // store: [],
      childDisplay: '0',
    });
  }


  render() {
    const {
      childDisplay,
      firstOperand,
    } = this.state;
    // const trial = this.getValue.current.value
    console.log('value in render =>', childDisplay);
    console.log('operand =>', firstOperand);


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

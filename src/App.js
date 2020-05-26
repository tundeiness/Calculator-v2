
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
      childDisplay: '0',
      prevOperand: null,
      nextOperand: null,
      isOperator: false,
      isNumberDecimal: true,
      operatorType: null,
      operatorCount: 0,

    };

    this.getInput = this.getInput.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
  }


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');
    // const prevAtt = e.currentTarget.getAttribute('data-previous');


    const {
      childDisplay, nextOperand, prevOperand, operatorCount, isOperator, isNumberDecimal, operatorType,
    } = this.state;

    // const display = childDisplay === '0' ? value : childDisplay + value;

    const conver = parseFloat(value);


    if (childDisplay === '0' && currVal === 'number') {
      this.setState({ childDisplay: value, prevOperand: childDisplay });
    } else {
      this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    }

    if (childDisplay === '0' && currVal === 'decimal') {
      this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    }

    if (childDisplay !== '0' && currVal === 'decimal') {
      this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    }

    if (!childDisplay.includes('.') && currVal === 'decimal') {
      this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    }

    if (childDisplay.includes('.') && currVal === 'decimal') {
      this.setState({ childDisplay, prevOperand: childDisplay });
    }

    // Watching for Operator keypress

    if (currVal === 'operator') {
      const ops = attribute;
      this.setState({
        childDisplay, operatorType: ops, prevOperand: childDisplay, isOperator: true, operatorCount: operatorCount + 1,
      });
    }

    if (isOperator && currVal === 'number') {
      this.setState({ childDisplay: value, nextOperand: childDisplay });
    }

    if (currVal === 'number' && nextOperand !== null) {
      this.setState({ childDisplay: childDisplay + value, nextOperand: childDisplay });
    }

    // Calculation stage


    // Clear Display

    if (attribute === 'all-clear') {
      this.handleAllClear();
    }
    // if (childDisplay === '0' && !Number.isNaN(conver)) {
    //   this.setState({ childDisplay: value });
    // } else if (value === '.' && !childDisplay.includes('.')) {
    //   this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay, isNumberDecimal: false });
    // } else if (childDisplay.includes('.') && !Number.isNaN(conver)) {
    //   this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay, isNumberDecimal: false });
    // }


    // console.log('digit', value);
    console.log('digit', childDisplay);
    console.log('OPS', operatorType);
  }

  handleAllClear() {
    this.setState({
      childDisplay: '0',
      prevOperand: null,
      nextOperand: null,
      isOperator: false,
      isNumberDecimal: true,
      operatorType: null,
      operatorCount: 0,
    });
  }


  render() {
    const {
      childDisplay, prevOperand, operatorType, nextOperand,
    } = this.state;
    console.log('value in render =>', childDisplay);
    console.log('check', prevOperand);
    console.log('The trio => ', prevOperand, operatorType, nextOperand);

    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} getInput={this.getInput} />
        <Top getInput={this.getInput} toggleButton={this.toggleButton} />
        <Bottom getInput={this.getInput} toggleButton={this.toggleButton} />
      </div>
    );
  }
}

export default App;

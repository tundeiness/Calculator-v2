
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

    };

    this.getInput = this.getInput.bind(this);
  }


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');
    const prevAtt = e.currentTarget.getAttribute('data-previous');


    const {
      childDisplay, nextOperand, prevOperand, isOperator, isNumberDecimal, operatorType,
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
      this.setState({ childDisplay, operatorType: ops, isOperator: true });
    }

    if (isOperator && currVal === 'number') {
      this.setState({ childDisplay: value, nextOperand: childDisplay });
    }

    if (currVal === 'number' && nextOperand !== null) {
      this.setState({ childDisplay: childDisplay + value, nextOperand: childDisplay });
    }

    // Calculation stage


    // if (childDisplay === '0' && !Number.isNaN(conver)) {
    //   this.setState({ childDisplay: value });
    // } else if (value === '.' && !childDisplay.includes('.')) {
    //   this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay, isNumberDecimal: false });
    // } else if (childDisplay.includes('.') && !Number.isNaN(conver)) {
    //   this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay, isNumberDecimal: false });
    // }

    // if (childDisplay === '0' && !childDisplay.includes('.')) {
    //   if (value === '.') {
    //     this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    //   } else {
    //     this.setState({ childDisplay: value, prevOperand: childDisplay });
    //   }
    // } else {
    //   this.setState({ childDisplay: prevOperand, prevOperand: childDisplay });
    // }

    // if (value === '.') {
    //   if (childDisplay === '0') {
    //     if (!childDisplay.includes('.')) {
    //       this.setState({ childDisplay: childDisplay + value, prevOperand: childDisplay });
    //     }
    //   }
    // }


    // console.log('digit', value);
    console.log('digit', childDisplay);
    console.log('OPS', operatorType);
  }


  render() {
    const { childDisplay, prevOperand } = this.state;
    console.log('value in render =>', childDisplay);
    console.log('check', prevOperand);
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

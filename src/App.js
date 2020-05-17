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
      next: true,
    };

    this.getInput = this.getInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateState = this.updateState.bind(this);
  }


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');
    const prevAtt = e.currentTarget.getAttribute('data-previous');


    let { childDisplay, next } = this.state;

    console.log(currVal);
    console.log('attri=>', attribute);

    if (attribute === null) {
      console.log('number key!');
    }


    if (
      attribute === 'add'
      || attribute === 'subtract'
      || attribute === 'multiply'
      || attribute === 'divide'
    ) {
      console.log('operator key!');
    }


    if (attribute === 'decimal') {
      console.log('decimal key!');
    }

    if (attribute === 'all-clear') {
      console.log('clear key!');
    }

    if (attribute === 'calculate') {
      console.log('equal key!');
    }


    // if (currVal === 'operator') {
    //   console.log('operator', value);
    //   this.setState({ childDisplay: value });
    // }

    // if (currVal === 'decimal') {
    //   this.setState({ childDisplay: value });
    // }
    if (attribute === null || prevAtt === 'operator') {
      if (childDisplay === '0') {
        this.setState({ childDisplay: value });
      } else {
        this.setState({ childDisplay: childDisplay += value }, () => { this.updateState(childDisplay); });
      }
    }

    if (attribute === 'decimal') {
      // display.textContent = displayedNum + '.'
      this.setState({ childDisplay: childDisplay + value }, () => { this.updateState(childDisplay); });
    }

    if (currVal === 'all-clear') {
      this.handleReset();
      return;
    }


    if (attribute === 'calculate') {
      // const firstValue = value;
      // const operator =
      const allValue = childDisplay;
      console.log('equals =>', allValue);
      // const operation = calculate(allValue);
      // ...
    }


    if (next === true) {
      this.setState({ childDisplay: value, next: false });
    } else if (childDisplay === '0') {
      this.setState({ childDisplay: value });
    } else {
      this.setState({ childDisplay: childDisplay += value }, () => { this.updateState(childDisplay); });
    }
  }

  updateState(value) {
    const { childDisplay } = this.state;
    this.setState({ childDisplay: value });
    console.log('value in updates =>', childDisplay);
  }


  handleReset() {
    this.setState({
      childDisplay: '0',
      // operandOne: null,
      next: false,
      // operator: null,
    });
  }


  render() {
    const { childDisplay } = this.state;
    console.log('value in render =>', childDisplay);
    return (
      <div className="app-wrapper">
        <Display childDisplay={childDisplay} getInput={this.getInput} />
        <Top getInput={this.getInput} />
        <Bottom getInput={this.getInput} />
      </div>
    );
  }
}

export default App;


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
      store: [],
      isOperator: false,

    };

    this.getInput = this.getInput.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    // this.onAddValues = this.onAddValues.bind(this);
    // this.handleCalculate = this.handleCalculate.bind(this);
    this.getValue = React.createRef();
    // this.updateOperator = this.updateOperator.bind(this);
  }

  componentDidMount() {
    // const { childDisplay } = this.state;
    // const childDisplay = localStorage.getItem('childDisplay', childDisplay)
    // this.setState({ childDisplay: childDisplay })


    // setter
    // localStorage.setItem('myData', data);
    // getter
    // localStorage.getItem('myData');
    // remove
    // localStorage.removeItem('myData');
    // remove all
    // localStorage.clear();
  }

  // onAddValues() {
  // this.setState((state) => {
  //   const store = state.store.concat(state.childDisplay);

  //   return {
  //     store,
  //   };
  // });
  // }


  // onAddValues(val) {
  //   this.setState((state) => {
  //     const store = state.store.concat(val);

  //     return {
  //       store,
  //     };
  //   });
  // }

  // updateOperator(val){

  //   this.setState((state) => {
  //     const operatorType = state.operatorType.concat(val);

  //     return {
  //       operatorType,
  //     };
  //   });

  // const updates = val;
  // this.setState({
  // operatorType: updates
  // });


  getInput(e) {
    const { value } = e.target;
    const currVal = e.currentTarget.className;

    const attribute = e.currentTarget.getAttribute('data-action');

    // const prevAtt = e.currentTarget.getAttribute('data-previous');

    const refVal = this.getValue.current.value;


    let { childDisplay } = this.state;

    let { store } = this.state;

    const conver = parseFloat(value);


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


    if ((childDisplay === '0' && currVal === 'decimal') || (childDisplay !== '0' && currVal === 'decimal')) {
      this.setState((state) => {
        childDisplay = state.childDisplay + value;
        return {
          childDisplay,
        };
      });
    }


    if (childDisplay.includes('.') && currVal === 'decimal') {
      this.setState(() => ({
        childDisplay,
      }));
    }

    // TODO  the line of code below requires investigation

    if (!childDisplay.includes('.') && currVal === 'decimal') {
      this.setState({ childDisplay: childDisplay + value });
    }


    if (childDisplay !== '0' || childDisplay === '0') {
      if (currVal === 'operator') {
      // setup localstorage
        localStorage.setItem('operand', refVal);
        localStorage.setItem('ops', attribute);
        this.setState((state) => {
          const operand = localStorage.getItem('operand');
          store = state.store.concat(operand);
          const isOperator = true;
          return {
            childDisplay,
            store,
            isOperator,
          };
        });
      }
    }

    let { isOperator } = this.state;

    if (isOperator === true && currVal === 'number') {
      this.setState(() => {
        childDisplay = value;
        isOperator = false;
        return {
          childDisplay,
          isOperator,
        };
      });
    }


    // if(childDisplay !== '0' && !Number.isNaN(conver)){
    //   this.setState({childDisplay: childDisplay + value})
    // }


    // if (!childDisplay.includes('.') && currVal === 'decimal') {
    //   this.setState({ childDisplay: childDisplay + value, isNumberDecimal: true });
    // }


    // if (childDisplay.includes('.') && currVal === 'decimal') {
    //   this.setState({ childDisplay: childDisplay + value, isNumberDecimal: true });
    // }

    // if (childDisplay !== '0' && currVal === 'decimal') {
    //   this.setState({ childDisplay: childDisplay + value, isNumberDecimal: true });
    // }
    // this.setState({childDisplay:value})


    // const con = parseFloat(childDisplay);

    // if (isOperator && !Number.isNaN(con)) {
    //   this.onAddValues();
    //   this.setState({ childDisplay });
    // }

    // if (isOperator && currVal === 'number') {
    //   if(prevOperand.length === 1){
    //     localStorage.setItem('Second', refVal,)
    //     const getPrev = localStorage.getItem('Second')

    //     this.setState((state) => {
    //       const nextOperand = state.nextOperand.concat(getPrev);

    //       return {
    //         nextOperand,
    //       };
    //     });
    //     this.setState({ childDisplay: value, isNumberDecimal:true });
    //   }
    // }

    // if (currVal === 'number' && nextOperand !== null) {
    //   this.setState({ childDisplay: childDisplay + value, nextOperand: childDisplay, isOperator: false });

    // }


    // Clear Display

    if (attribute === 'all-clear') {
      this.handleAllClear();
    }

    console.log('digit', childDisplay);
    console.log('store =>', store);
    const signs = localStorage.getItem('ops');
    console.log('operations =>', signs);
    // console.log('OPS', operatorType);
    // this.setState({test: this.getValue.current.value})
  }

  // handleCalculate = (operandOne, operator, operandTwo) => {
  //   let result = '';
  //   if (operator === 'add') {
  //     result = parseFloat(operandOne) + parseFloat(operandTwo);
  //   } else if (operator === 'subtract') {
  //     result = parseFloat(operandOne) - parseFloat(operandTwo);
  //   } else if (operator === 'multiply') {
  //     result = parseFloat(operandOne) * parseFloat(operandTwo);
  //   } else if (operator === 'divide') {
  //     result = parseFloat(operandOne) / parseFloat(operandTwo);
  //   }

  //   return result;
  // }


  handleAllClear() {
    this.setState({
      store: [],
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
      childDisplay,
    } = this.state;
    // const trial = this.getValue.current.value
    console.log('value in render =>', childDisplay);


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

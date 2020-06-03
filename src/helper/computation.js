
// const Computation = {
//   '/': (operandOne, secondOperand) => operandOne / secondOperand,

//   '*': (operandOne, secondOperand) => operandOne * secondOperand,

//   '+': (operandOne, secondOperand) => operandOne + secondOperand,

//   '-': (operandOne, secondOperand) => operandOne - secondOperand,

//   '=': (operandOne, secondOperand) => secondOperand,
// };

const Computation = (operandOne, operator, operandTwo) => {
  let result = '';
  if (operator === 'add') {
    result = parseFloat(operandOne) + parseFloat(operandTwo);
  } else if (operator === 'subtract') {
    result = parseFloat(operandOne) - parseFloat(operandTwo);
  } else if (operator === 'multiply') {
    result = parseFloat(operandOne) * parseFloat(operandTwo);
  } else if (operator === 'divide') {
    result = parseFloat(operandOne) / parseFloat(operandTwo);
  }

  return result;
};


export default Computation;

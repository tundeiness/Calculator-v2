
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
  // return result.toFixed(8);
};


export default Computation;

// const Computation = {
//   '+': (operandOne, operandTwo) => operandOne + operandTwo,
//   '-': (operandOne, operandTwo) => operandOne - operandTwo,
//   '÷': (operandOne, operandTwo) => operandOne / operandTwo,
//   '*': (operandOne, operandTwo) => operandOne * operandTwo,
//   '=': (operandOne, operandTwo) => operandTwo,
// };

// const Computation = {
//   add: (operandOne, operandTwo) => operandOne + operandTwo,
//   subtract: (operandOne, operandTwo) => operandOne - operandTwo,
//   divide: (operandOne, operandTwo) => operandOne / operandTwo,
//   multiply: (operandOne, operandTwo) => operandOne * operandTwo,
//   equals: (operandOne, operandTwo) => operandTwo,
// };

const Computation = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
};


export default Computation;

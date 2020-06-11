/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';


const OperatorPanel = (props) => {
  const { getInput } = props;
  return (
    <div className="operator-wrapper">
      <button type="button" className="all-clear" onClick={getInput} value="ac" data-action="all-clear">AC</button>
      <button type="button" className="decimal" onClick={getInput} value="." data-action="decimal">.</button>
      <button type="button" className="operator" onClick={getInput} value="/" data-action="divide" data-previous="operator">&divide;</button>
      <button type="button" className="operator" onClick={getInput} value="-" data-action="subtract" data-previous="operator" id="subtract">-</button>
    </div>
  );
};
export default OperatorPanel;

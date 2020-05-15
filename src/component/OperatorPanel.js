/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';


const OperatorPanel = (props) => {
  const { getInput } = props;
  return (
    <div className="operator-wrapper">
      <button type="button" className="all-clear" onClick={getInput}>AC</button>
      <button type="button" className="decimal" onClick={getInput} value=".">.</button>
      <button type="button" className="operator" onClick={getInput} value="/">&divide;</button>
      <button type="button" className="operator" onClick={getInput} value="-">-</button>
    </div>
  );
};
export default OperatorPanel;

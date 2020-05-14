/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';


const OperatorPanel = () => (
  <div className="operator-wrapper">
    <button type="button" className="all-clear" value="all-clear">AC</button>
    <button type="button" className="decimal" value=".">.</button>
    <button type="button" className="operator" value="/">&divide;</button>
    <button type="button" className="operator" value="-">-</button>
  </div>
);
export default OperatorPanel;

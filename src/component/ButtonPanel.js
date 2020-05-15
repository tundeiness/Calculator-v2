
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';


const ButtonPanel = (props) => {
  const { getInput } = props;
  return (
    <div className="panel-wrapper">
      <div className="num-wrapper">
        <button type="button" onClick={getInput} value="9" className="number">9</button>
        <button type="button" onClick={getInput} value="8" className="number">8</button>
        <button type="button" onClick={getInput} value="7" className="number">7</button>
        <button type="button" onClick={getInput} value="6" className="number">6</button>
        <button type="button" onClick={getInput} value="5" className="number">5</button>
        <button type="button" onClick={getInput} value="4" className="number">4</button>
        <button type="button" onClick={getInput} value="3" className="number">3</button>
        <button type="button" onClick={getInput} value="2" className="number">2</button>
        <button type="button" onClick={getInput} value="1" className="number">1</button>
        <button type="button" onClick={getInput} value="0" className="number" id="zero">0</button>
      </div>
      <div className="other-wrapper">
        <button type="button" className="operator" onClick={getInput} value="*" id="multiply">&times;</button>
        <button type="button" className="operator" onClick={getInput} value="+" id="add">+</button>
        <button type="button" className="equal-sign operator" onClick={getInput} value="=" id="equals">=</button>
      </div>
    </div>
  );
};
export default ButtonPanel;

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import OperatorX from '../helper/button';


const OperatorPanel = (props) => {
  const { handleInput, handleReset } = props;
  const { handleDecimal } = props;

  const operatorArr = OperatorX.map((ele) => (<button type="button" value={ele.value} id={ele.id} className={ele.class} onClick={(e, value) => { handleInput(e, value); handleDecimal(e, value); handleReset(e, value); }}>{ele.name}</button>));
  return (
    <div className="operator-wrapper">
      {operatorArr}
    </div>
  );
};


export default OperatorPanel;

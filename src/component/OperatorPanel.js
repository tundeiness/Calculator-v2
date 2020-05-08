/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import OperatorX from '../helper/button';


const OperatorPanel = (props) => {
  const { handleInput } = props;
  const { handleDecimal } = props;

  const operatorArr = OperatorX.map((ele) => (<button type="button" value={ele.value} id={ele.id} className={ele.class} onClick={() => { handleInput(ele.name); handleDecimal(ele.name); }}>{ele.name}</button>));
  return (
    <div className="operator-wrapper">
      {operatorArr}
    </div>
  );
};


export default OperatorPanel;

/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import OperatorX from '../helper/button';


const OperatorPanel = () => {
  const operatorArr = OperatorX.map((ele) => (<button type="button" value={ele.value} id={ele.id} className={ele.class}>{ele.name}</button>));
  return (
    <div className="operator-wrapper">
      {operatorArr}
    </div>
  );
};


export default OperatorPanel;

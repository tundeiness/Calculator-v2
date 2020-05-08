/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import Digits from '../helper/digits';
import OperatorY from '../helper/operator';


const ButtonPanel = () => {
  const digitsArr = Digits.map((ele) => (<button type="button" value={ele.value} id={ele.id} className={ele.class}>{ele.name}</button>));
  const operatorArr = OperatorY.map((ele) => (<button type="button" value={ele.value} id={ele.id} className={ele.class}>{ele.name}</button>));
  return (
    <div className="panel-wrapper">
      <div className="num-wrapper">
        {digitsArr}
      </div>
      <div className="other-wrapper">
        {operatorArr}
      </div>
    </div>
  );
};


export default ButtonPanel;

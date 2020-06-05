/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import PropTypes from 'prop-types';

// const Counter = React.forwardRef((props, ref) => {
const Display = React.forwardRef((props, ref) => {
  const { childDisplay } = props;
  return (
    <>
      <input type="text" className="calculator-screen calculator__display" id="display" ref={ref} value={childDisplay} maxLength="9" disabled />
    </>
  );
});


// Display.propTypes = {
//   childDisplay: PropTypes.string.isRequired,
// };
export default Display;

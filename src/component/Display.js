/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import PropTypes from 'prop-types';

// class Display extends React.Component {
//   render() {
//     return (
//       <div className="calculator__display" id="display">
//         <p>{this.props.childDisplay}</p>
//       </div>
//     );
//   }
// }

const Display = (props) => {
  const { childDisplay } = props;
  return (
    <div className="calculator__display" id="display">
      <p>{childDisplay}</p>
    </div>
  );
};


// Display.propTypes = {
//   childDisplay: PropTypes.string.isRequired,
// };
export default Display;

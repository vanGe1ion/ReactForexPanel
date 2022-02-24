import React from "react";

const NumberInput = ({value, onChange}) => {
  return <input value={value} onChange={onChange} type="number" min='0'/>;
};

export default NumberInput;

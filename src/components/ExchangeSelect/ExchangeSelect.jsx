import React from "react";

const ExchangeSelect = ({ exchanges, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {exchanges.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default ExchangeSelect;

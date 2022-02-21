import React from "react";

const ExchangeSelect = ({ rateList, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {rateList.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default ExchangeSelect;

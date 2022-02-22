import React from "react";
import ExchangeSelect from "../ExchangeSelect/ExchangeSelect";
import NumberInput from "../NumberInput/NumberInput";

const ExchangeInput = ({
  rateList,
  selectValue,
  onChangeSelect,
  inputValue,
  onChangeInput,
}) => {
  return (
    <>
      <ExchangeSelect
        rateList={Object.keys(rateList)}
        value={selectValue}
        onChange={onChangeSelect}
      />
      <NumberInput value={inputValue} onChange={onChangeInput} />
    </>
  );
};

export default ExchangeInput;

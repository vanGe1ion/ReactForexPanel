import React, { useEffect, useState } from "react";
import ConverterGroup from "../ConverterGroup/ConverterGroup";
import cl from "./Converter.module.css";
import ExchangeSelect from "../ExchangeSelect/ExchangeSelect";
import NumberInput from "../NumberInput/NumberInput";
import { getForex } from "../../API/forexAPI";

const Converter = ({ getActual, toggled }) => {
  const [rateList, setRateList] = useState({});
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const [currentInput, setCurrentInput] = useState(1);

  useEffect(() => {
    getForex((data) => {
      setRateList(data.rates);
      getActual(data.date);
      setCurrency1("EUR");
      setCurrency2("RUB");
      setValue1(100);
    });
  }, []);

  useEffect(() => {
    if (currentInput === 1) setValue2(calculate());
    if (currentInput === 2) setValue1(calculate());
  }, [currency1, currency2, value1, value2]);

  useEffect(() => {
    toggleExchange({
      currency1,
      currency2,
      value2,
    });
  }, [toggled]);

  const calculate = () => {
    let result = null;
    if (currentInput === 1)
      result = ((value1 * rateList[currency2]) / rateList[currency1]).toFixed(
        4
      );
    if (currentInput === 2)
      result = ((value2 * rateList[currency1]) / rateList[currency2]).toFixed(
        4
      );
    if (isNaN(result)) return 0;
    return result;
  };

  const toggleExchange = (oldState) => {
    setCurrency1(oldState.currency2);
    setCurrency2(oldState.currency1);
    setCurrentInput(1);
    setValue1(oldState.value2);
  };

  return (
    <div className={cl.converter}>
      <ConverterGroup>
        <span>Вы переводите из</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeSelect
          rateList={Object.keys(rateList)}
          value={currency1}
          onChange={(e) => setCurrency1(e.target.value)}
        />
        <NumberInput
          value={value1}
          onChange={(e) => {
            setValue1(e.target.value);
            setCurrentInput(1);
          }}
        />
      </ConverterGroup>

      <ConverterGroup>
        <span>в</span>
        <span>=</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeSelect
          rateList={Object.keys(rateList)}
          value={currency2}
          onChange={(e) => setCurrency2(e.target.value)}
        />
        <NumberInput
          value={value2}
          onChange={(e) => {
            setValue2(e.target.value);
            setCurrentInput(2);
          }}
        />
      </ConverterGroup>
    </div>
  );
};

export default Converter;

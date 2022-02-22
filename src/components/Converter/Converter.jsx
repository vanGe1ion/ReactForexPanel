import React, { useEffect, useState } from "react";
import ConverterGroup from "../ConverterGroup/ConverterGroup";
import cl from "./Converter.module.css";
import ExchangeSelect from "../ExchangeSelect/ExchangeSelect";
import NumberInput from "../NumberInput/NumberInput";
import { getForex } from "../../API/forexAPI";
import { proportionCalc } from "../../utils/utils";
import { NUMBER_INPUT_FIRST, NUMBER_INPUT_SECOND } from "../consts";
import ExchangeInput from "../ExchangeInput/ExchangeInput";

const Converter = ({ getActual, toggled }) => {
  const [rateList, setRateList] = useState({});
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const [currentInput, setCurrentInput] = useState(NUMBER_INPUT_FIRST);

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
    const calcResult = calculateExchange();
    if (currentInput === NUMBER_INPUT_FIRST) setValue2(calcResult);
    else setValue1(calcResult);
  }, [currency1, currency2, value1, value2]);

  useEffect(() => {
    toggleExchange({
      currency1,
      currency2,
      value2,
    });
  }, [toggled]);

  const calculateExchange = () => {
    let proportinMembers = {};

    if (currentInput === NUMBER_INPUT_FIRST)
      proportinMembers = {
        numerator1: value1,
        denominator1: rateList[currency1],
        denominator2: rateList[currency2],
      };
    else
      proportinMembers = {
        numerator1: value2,
        denominator1: rateList[currency2],
        denominator2: rateList[currency1],
      };

    let result = proportionCalc(proportinMembers, 4);
    return isNaN(result) ? 0 : result;
  };

  const toggleExchange = (oldState) => {
    setCurrency1(oldState.currency2);
    setCurrency2(oldState.currency1);
    setCurrentInput(NUMBER_INPUT_FIRST);
    setValue1(oldState.value2);
  };

  return (
    <div className={cl.converter}>
      <ConverterGroup>
        <span>Вы переводите из</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeInput
          rateList={rateList}
          selectValue={currency1}
          onChangeSelect={(e) => setCurrency1(e.target.value)}
          inputValue={value1}
          onChangeInput={(e) => {
            setValue1(e.target.value);
            setCurrentInput(NUMBER_INPUT_FIRST);
          }}
        />
      </ConverterGroup>

      <ConverterGroup>
        <span>в</span>
        <span>=</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeInput
          rateList={rateList}
          selectValue={currency2}
          onChangeSelect={(e) => setCurrency2(e.target.value)}
          inputValue={value2}
          onChangeInput={(e) => {
            setValue2(e.target.value);
            setCurrentInput(NUMBER_INPUT_SECOND);
          }}
        />
      </ConverterGroup>
    </div>
  );
};

export default Converter;

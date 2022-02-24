import React, { useEffect, useState } from "react";
import ConverterGroup from "../ConverterGroup/ConverterGroup";
import cl from "./Converter.module.css";
import { getForex } from "../../API/forexAPI";
import { proportionCalc } from "../../utils/utils";
import {
  CURRENCY_FROM_INIT_VALUE,
  CURRENCY_TO_INIT_VALUE,
  AMOUNT_FROM_INIT_VALUE,
  NUMBER_INPUT_FROM,
  NUMBER_INPUT_TO,
} from "../consts";
import ExchangeInput from "../ExchangeInput/ExchangeInput";

const Converter = ({ setActualDate, toggleCurrency }) => {
  const [currencyRateListFromAPI, setCurrencyRateListFromAPI] = useState({});

  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");

  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);

  const [currentChangedInput, setCurrentChangedInput] =
    useState(NUMBER_INPUT_FROM);

  useEffect(() => {
    getForex((data) => {
      setCurrencyRateListFromAPI(data.rates);
      setActualDate(data.date);
      setCurrencyFrom(CURRENCY_FROM_INIT_VALUE);
      setCurrencyTo(CURRENCY_TO_INIT_VALUE);
      setAmountFrom(AMOUNT_FROM_INIT_VALUE);
    });
  }, []);

  useEffect(() => {
    const calcResult = calculateExchange(currentChangedInput);
    currentChangedInput === NUMBER_INPUT_FROM
      ? setAmountTo(calcResult)
      : setAmountFrom(calcResult);
  }, [currencyFrom, currencyTo, amountFrom, amountTo]);

  useEffect(() => {
    toggleCurrrency({
      currencyFrom,
      currencyTo,
      amountTo,
    });
  }, [toggleCurrency]);

  const calculateExchange = (inputCurrent) => {
    const proportionMembers =
      inputCurrent === NUMBER_INPUT_FROM
        ? {
            numeratorLeft: amountFrom,
            denominatorLeft: currencyRateListFromAPI[currencyFrom],
            denominatorRight: currencyRateListFromAPI[currencyTo],
          }
        : {
            numeratorLeft: amountTo,
            denominatorLeft: currencyRateListFromAPI[currencyTo],
            denominatorRight: currencyRateListFromAPI[currencyFrom],
          };

    const result = proportionCalc(proportionMembers, 4);
    return isNaN(result) ? 0 : result;
  };

  const toggleCurrrency = (oldState) => {
    const { currencyTo, currencyFrom, amountTo } = oldState;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setCurrentChangedInput(NUMBER_INPUT_FROM);
    setAmountFrom(amountTo);
  };

  return (
    <div className={cl.converter}>
      <ConverterGroup>
        <span>Вы переводите из</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeInput
          rateList={currencyRateListFromAPI}
          selectValue={currencyFrom}
          onChangeSelect={(e) => setCurrencyFrom(e.target.value)}
          inputValue={amountFrom}
          onChangeInput={(e) => {
            setAmountFrom(e.target.value);
            setCurrentChangedInput(NUMBER_INPUT_FROM);
          }}
        />
      </ConverterGroup>

      <ConverterGroup>
        <span>в</span>
        <span>=</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeInput
          rateList={currencyRateListFromAPI}
          selectValue={currencyTo}
          onChangeSelect={(e) => setCurrencyTo(e.target.value)}
          inputValue={amountTo}
          onChangeInput={(e) => {
            setAmountTo(e.target.value);
            setCurrentChangedInput(NUMBER_INPUT_TO);
          }}
        />
      </ConverterGroup>
    </div>
  );
};

export default Converter;

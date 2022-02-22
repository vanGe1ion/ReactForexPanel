import React, { useEffect, useState } from "react";
import ConverterGroup from "../ConverterGroup/ConverterGroup";
import cl from "./Converter.module.css";
import { getForex } from "../../API/forexAPI";
import { proportionCalc } from "../../utils/utils";
import {
  CURRENCY_FIRST_INIT_VALUE,
  AMOUNT_FIRST_INIT_VALUE,
  NUMBER_INPUT_FIRST,
  NUMBER_INPUT_SECOND,
  CURRENCY_SECOND_INIT_VALUE,
} from "../consts";
import ExchangeInput from "../ExchangeInput/ExchangeInput";

const Converter = ({ setActualDate, toggleCurrency }) => {
  const [rateList, setRateList] = useState({});

  const [currencyFirst, setCurrencyFirst] = useState("");
  const [currencySecond, setCurrencySecond] = useState("");

  const [amountFirst, setAmountFirst] = useState(0);
  const [amountSecond, setAmountSecond] = useState(0);

  const [currentInput, setCurrentInput] = useState(NUMBER_INPUT_FIRST);

  useEffect(() => {
    getForex((data) => {
      setRateList(data.rates);
      setActualDate(data.date);
      setCurrencyFirst(CURRENCY_FIRST_INIT_VALUE);
      setCurrencySecond(CURRENCY_SECOND_INIT_VALUE);
      setAmountFirst(AMOUNT_FIRST_INIT_VALUE);
    });
  }, []);

  useEffect(() => {
    const calcResult = calculateExchange(currentInput);
    currentInput === NUMBER_INPUT_FIRST
      ? setAmountSecond(calcResult)
      : setAmountFirst(calcResult);
  }, [currencyFirst, currencySecond, amountFirst, amountSecond]);

  useEffect(() => {
    toggleCurrrency({
      currencyFirst,
      currencySecond,
      amountSecond,
    });
  }, [toggleCurrency]);

  const calculateExchange = (inputCurrent) => {
    let proportionMembers = {};

    switch (inputCurrent) {
      case NUMBER_INPUT_FIRST: {
        proportionMembers = {
          numeratorLeft: amountFirst,
          denominatorLeft: rateList[currencyFirst],
          denominatorRight: rateList[currencySecond],
        };
        break;
      }
      case NUMBER_INPUT_SECOND: {
        proportionMembers = {
          numeratorLeft: amountSecond,
          denominatorLeft: rateList[currencySecond],
          denominatorRight: rateList[currencyFirst],
        };
        break;
      }
    }

    let result = proportionCalc(proportionMembers, 4);
    return isNaN(result) ? 0 : result;
  };

  const toggleCurrrency = (oldState) => {
    setCurrencyFirst(oldState.currencySecond);
    setCurrencySecond(oldState.currencyFirst);
    setCurrentInput(NUMBER_INPUT_FIRST);
    setAmountFirst(oldState.amountSecond);
  };

  return (
    <div className={cl.converter}>
      <ConverterGroup>
        <span>Вы переводите из</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeInput
          rateList={rateList}
          selectValue={currencyFirst}
          onChangeSelect={(e) => setCurrencyFirst(e.target.value)}
          inputValue={amountFirst}
          onChangeInput={(e) => {
            setAmountFirst(e.target.value);
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
          selectValue={currencySecond}
          onChangeSelect={(e) => setCurrencySecond(e.target.value)}
          inputValue={amountSecond}
          onChangeInput={(e) => {
            setAmountSecond(e.target.value);
            setCurrentInput(NUMBER_INPUT_SECOND);
          }}
        />
      </ConverterGroup>
    </div>
  );
};

export default Converter;

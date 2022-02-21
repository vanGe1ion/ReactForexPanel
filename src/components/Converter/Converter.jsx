import React, { useEffect, useState } from "react";
import ConverterGroup from "../ConverterGroup/ConverterGroup";
import cl from "./Converter.module.css";
import { Fetch } from "../../utils/script";
import ExchangeSelect from "../ExchangeSelect/ExchangeSelect";

const Converter = ({ getActual, toggled }) => {
  const [exchanges, setExchanges] = useState({});
  const [exchange1, setExchange1] = useState("");
  const [exchange2, setExchange2] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(() => {
    Fetch(
      "http://data.fixer.io/api/latest?access_key=ea516aed6f2b591d600566b784ae5350&format=1",
      (data) => {
        setExchanges(data.rates);
        getActual(data.date);
        setExchange1("EUR");
        setExchange2("RUB");
        setValue1("100");
        setValue2("0");
      }
    );
  }, []);

  useEffect(() => {
    setValue2(calculate(exchange1, exchange2, value1));
  }, [exchange1, exchange2, value1]);

  useEffect(() => {
    toggleExchange({
      exchange1,
      exchange2,
      value2,
    });
  }, [toggled]);

  const calculate = (exchange1, exchange2, value1) => {
    if (isNaN(Number(value1))) return "Некорректный ввод";
    if (isNaN(exchanges[exchange1])) return "0";
    return (
      (Number(value1) * exchanges[exchange2]) /
      exchanges[exchange1]
    ).toFixed(4);
  };

  const toggleExchange = (oldState) => {
    setValue1(oldState.value2);
    setExchange1(oldState.exchange2);
    setExchange2(oldState.exchange1);
  };

  return (
    <div className={cl.converter}>
      <ConverterGroup>
        <span>Вы переводите из</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeSelect
          exchanges={Object.keys(exchanges)}
          value={exchange1}
          onChange={(e) => setExchange1(e.target.value)}
        />
        <input
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          type="text"
        />
      </ConverterGroup>

      <ConverterGroup>
        <span>в</span>
        <span>=</span>
      </ConverterGroup>

      <ConverterGroup>
        <ExchangeSelect
          exchanges={Object.keys(exchanges)}
          value={exchange2}
          onChange={(e) => setExchange2(e.target.value)}
        />
        <input value={value2} onChange={() => {}} type="text" />
      </ConverterGroup>
    </div>
  );
};

export default Converter;

import React, { useState } from "react";
import Converter from "../Converter/Converter";
import cl from "./ForexPanel.module.css";

const ForexPanel = () => {
  const [actualityDate, setActualityDate] = useState("");
  const [toggleCurrency, setToggleCurrency] = useState(false);

  return (
    <div className={cl.forexPanel}>
      <h1>Конвертер валют</h1>
      <h2>Данные актуальны на {actualityDate}</h2>
      <Converter
        setActualDate={(date) => setActualityDate(date)}
        toggleCurrency={toggleCurrency}
      />
      <h2
        onClick={() => setToggleCurrency((prev) => !prev)}
        className={cl.toggler}
      >
        поменять валюты местами
      </h2>
    </div>
  );
};

export default ForexPanel;

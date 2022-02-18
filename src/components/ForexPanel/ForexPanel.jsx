import React, {useState} from 'react'
import Converter from '../Converter/Converter'
import cl from "./ForexPanel.module.css"


const ForexPanel = () => {

  const [actuality, setActuality] = useState('');

  const getActual = (date) => {
    console.log(date)
      setActuality(date)
  }

  return (
    <div className={cl.forexPanel}>

      <h1>Конвертер валют</h1>
      <h2>Данные актуальны на {actuality}</h2>
      <Converter getActual={getActual}/>
      <h2 className={cl.toggler}>поменять валюты местами</h2>

    </div>
  )
}

export default ForexPanel
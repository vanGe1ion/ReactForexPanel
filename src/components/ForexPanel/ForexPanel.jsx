import React, {useState} from 'react'
import Converter from '../Converter/Converter'
import cl from "./ForexPanel.module.css"


const ForexPanel = () => {

  const [actuality, setActuality] = useState('');
  const [toggled, setToggled] = useState(false);

  const getActual = (date) => {
      setActuality(date)
  }

  const toggleExchange = () => {
    setToggled(prev => !prev)
  }

  return (
    <div className={cl.forexPanel}>

      <h1>Конвертер валют</h1>
      <h2>Данные актуальны на {actuality}</h2>
      <Converter getActual={getActual} toggled={toggled}/>
      <h2 
        onClick={() => toggleExchange()} 
        className={cl.toggler}
      >
        поменять валюты местами
      </h2>

    </div>
  )
}

export default ForexPanel
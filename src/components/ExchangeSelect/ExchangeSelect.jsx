import React from 'react'

const ExchangeSelect = ({exchanges}) => {
  return (
    <select>
        {Object.keys(exchanges).map((key) => 
            <option key={key} value={exchanges[key]}>{key}</option>
        )}
    </select>
  )
}

export default ExchangeSelect
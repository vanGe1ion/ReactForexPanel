import React from 'react'
import cl from "./ConverterGroup.module.css"

const ConverterGroup = ({children}) => {
  return (
    <div className={cl.converterGroup}>
        {children}
    </div>
  )
}

export default ConverterGroup
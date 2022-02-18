import React, {useEffect, useState} from 'react'
import ConverterGroup from '../ConverterGroup/ConverterGroup'
import cl from "./Converter.module.css"
import { Fetch } from '../../service/script'
import ExchangeSelect from '../ExchangeSelect/ExchangeSelect'

const Converter = ({getActual}) => {

    const [exchanges, setExchanges] = useState({});
    const [exchange1, setExchange1] = useState({});
    const [exchange2, setExchange2] = useState({});


    useEffect(()=>{
        Fetch('http://data.fixer.io/api/latest?access_key=ea516aed6f2b591d600566b784ae5350&format=1', data =>{
            setExchanges(data.rates)
            getActual(data.date)
        });
    }, [])


    return (
        <div className={cl.converter}>
            <ConverterGroup>
            <span>Вы переводите из</span>
            </ConverterGroup>
            <ConverterGroup>
            <ExchangeSelect exchanges={exchanges}/>
            <input type='text'/>
            </ConverterGroup>
            <ConverterGroup>
            <span>в</span>
            <span>=</span>
            </ConverterGroup>
            <ConverterGroup>
            <ExchangeSelect exchanges={exchanges}/>
            <input type='text'/>
            </ConverterGroup>
        </div>
    )
}

export default Converter
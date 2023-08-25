import React, { useState } from 'react'
import './Search.css'

export const Search = ({ state, send }) => {
  const [originCountry, setOriginCountry] = useState('')
  const [destinationCountry, setDestinationCountry] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [dateError, setDateError] = useState('')

  const goToPassengers = () => {
    send('CONTINUE', { 
      originCountry: originCountry, 
      destinationCountry: destinationCountry,
      departureDate: departureDate,
      returnDate: returnDate,
    });
  }

  const handleOriginSelectChange  = (event) => {
    setOriginCountry(event.target.value)
  }

  const handleDestinationSelectChange = (event) => {
    setDestinationCountry(event.target.value)
  }

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value)
  }

  const handleReturnDateChange = (event) => {
    const newReturnDate = event.target.value
    setDateError('')
    setReturnDate(newReturnDate)
}

  const options = state.context.countries

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={originCountry} onChange={handleOriginSelectChange }>
        <option value="" disabled defaultValue>Pais de origen</option>
        {options?.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
      </select>
      <select id="country" className='Search-select' value={destinationCountry} onChange={handleDestinationSelectChange}>
        <option value="" disabled defaultValue>Escoge tu destino</option>
        {options?.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
      </select>
      <div className='Search-Date'>
        <div className='travel-day'>
          <p>fecha Ida</p>
          <input 
            type='date' 
            value={departureDate} 
            onChange={handleDepartureDateChange} 
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className='travel-day'>
          <p>fecha Vuelta</p>
          <input 
            type='date' 
            value={returnDate} 
            onChange={handleReturnDateChange} 
            min={departureDate || new Date().toISOString().split('T')[0]}
          />
        </div>
        </div>
      {dateError && <p className='error-message'>{dateError}</p>}
      <button 
      disabled={!originCountry || !destinationCountry || !departureDate || !returnDate} 
        className='Search-continue button'
        onClick={goToPassengers}
      >
        Continuar
      </button>
   
    </div>
  )
}

import './Tickets.css'

export const Tickets = ({ send, state}) => {
  const finish = () => {
    send('FINISH', { 
      newPassenger: [],
      originCountry: '', 
      destinationCountry: '',
      departureDate: '',
      returnDate: '',
      })
  }

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>
          <p>Lugar de origen: {state.context.originCountry}</p>
          <p>Su destino: {state.context.destinationCountry}</p>
        </div>
        <div className='Tickets-passengers'>
          <h2>Pasajeros</h2>
          <span>✈</span>
          {state.context.passengers.map((person, idx) => {
            return <p key={idx}>{person}</p>
          })}
        </div>
        <div className='Tickets-dates'>
          <p>Fecha de Ida: {new Date(state.context.departureDate).toLocaleDateString()}</p>
          <p>Fecha de Vuelta: {new Date(state.context.returnDate).toLocaleDateString()}</p>

        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  )
}
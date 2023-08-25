import { assign, createMachine } from 'xstate';
import { fetchCountries } from '../Utils/api';

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};


const bookingMachine = createMachine({
  predictableActionArguments: true,
  id: 'by plane tickets',
  initial: 'initial',
  context: {
    passengers: [],
    originCountry: '',
    destinationCountry: '',
    departureDate: '',
    returnDate: '',
  },
  states: {
    initial: {
      on: {
        START: {
          target:'search',
        },
      }
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            originCountry: (context, event) => event.originCountry,
            destinationCountry: (context, event) => event.destinationCountry,
            departureDate: (context, event) => event.departureDate, 
            returnDate:(context,event)=> event.returnDate

          })
        },
        CANCEL: 'initial',
      },
      ...fillCountries,
    },
    passengers: {
      on: {
        DONE: {
          target: 'tickets',
        },
        CANCEL: {
          target: 'initial',
          actions: 'cleanContext'
        },
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      }
    },
    tickets: {
      after: {
        10000: {
          target: 'initial',
          actions: 'cleanContext'
        },
      },
      on: {
        FINISH: 'initial',
      },
      entry: assign((context, event) => {
        return {
          selectedCountry: context.selectedCountry,
          departureDate: context.departureDate,
          returnDate: context.returnDate,
          passengers: context.passengers,
        }
        }
      ),
    },
  },
  actions: {
    cleanContext: assign({
      selectedCountry: '',
      passengers: [],
    })
  },
 
})

export { bookingMachine }
import { assign, createMachine } from 'xstate';

const bookingMachine = createMachine({
  predictableActionArguments: true,
  id: 'by plane tickets',
  initial: 'initial',
  context: {
    passengers: [],
    selectedCountry: '',
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
            selectedCountry: (context, event) => event.selectedCountry
          })
        },
        CANCEL: 'initial',
      }
    },
    tickets: {
       on: {
        FINISH: 'initial',
      }
    },
    passengers: {
      on: {
        DONE: 'tickets',
        CANCEL: 'initial',
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      }
    },
   
  },
   actions: {
      imprimirInicio: () => console.log('imprimir inicio'),
      imprimirEntrada: () => console.log('imprimir entrada al search'),
      imprimirSalida: () => console.log('imprimir salida del search'),
    }
})

export { bookingMachine }
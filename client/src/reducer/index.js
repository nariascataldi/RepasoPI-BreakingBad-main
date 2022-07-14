//declaro los estados
const initialState = {
  characters: [], //Estado original sin mutación
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload
      }
    default:
      return state;
  }
}
export default rootReducer;


/**
 * 1º armo la función rootReducer y la exporto
 * 2º declaro los estados (puedo ir declarandolos a medida que voy recorriendo el proyecto)
 * 3º en la funcion agrego el estado y el switch action (que tenía el type y el payload)
 * 4º case get_characters: en mi areglo vacío de characters, mandá todo lo que llegue del action videogame.
 * ya está la lógica de traer los characters
 * 5º Luego voy para el Home --> src/components/home
 */
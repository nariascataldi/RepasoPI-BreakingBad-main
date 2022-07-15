//declaro los estados
const initialState = {
  characters: [], //Estado original sin mutación
  allCharacters: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload
      }
    case 'FILTER_BY_STATUS':
      const allCharacters = state.allCharacters;
      const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
      return {
        ...state,
        characters: statusFiltered
      }
    case 'FILTER_CREATED':
      const allCharactersC = state.allCharacters;
      const createdFilter = action.payload === 'created' ? allCharactersC.filter((el) => el.createdInDb) : allCharactersC.filter((el) => !el.createdInDb);
      return {
        ...state,
        characters: action.payload === 'All' ? state.allCharacters : createdFilter
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
import axios from "axios";

export function getCharacters() {
  return async function (dispach) {
    var json = await axios.get("http://localhost:3001/characters");
    return dispach({
      type: 'GET_CHARACTERS',
      payload: json.data
    })
  }
}
/**
 * 1º en la línea 5 llamó al Backend
 * 2º Luego voy al reducer
 */
//Search
export function getNameCharacters(name) {
  return async function (dispach) {
    try {
      var json = await axios.get('http://localhost:3001/characters?name=' + name);
      return dispach({
        type: 'GET_NAME_CHARACTERS',
        payload: json.data
      })
    } catch(error){
      console.log(error);
    }
  }
}

//FILTROS
export function filterCharactersByStatus(payload) {
  return {
    type: 'FILTER_BY_STATUS',
    payload
  }
}
export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}
export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## ***FRONT END parte 4***
## `1` Detail

## Vamos a [Actions](client/src/actions/index.js)
para exportar una función llamada getDetail
```js
export function getDetail(id) {
  return async function(dispatch){
    try {
      var json = await axios.get("http://localhost:3001/characters/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}
```
## Vamos al [Reducer](client/src/reducer/index.js)
Agregamos al estado inicial una array vacío para guardar el detail, y luego creamos el caso `GET_DETAILS`.
```js
const initialState = {
...
  detail:[]
}
...
  case 'GET_DETAILS':
    return {
      ...state,
      detail: action.payload
    }
```
## Vamos al Component [Detail](client/src/components/Datail.jsx)

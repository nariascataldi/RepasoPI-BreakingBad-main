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
## Vamos al [App](client/src/App.js)
Agregamos la ruta
```js
import Detail from './components/Detail';

function App() {
 ...
    <Route path='/home/:id' element={<Detail />} />
... }
```
## Vamos al Component [Detail](client/src/components/Datail.jsx)
```js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch])

  const myCharacter = useSelector((state) => state.detail)
  return (
    <div>
      {
        myCharacter.length > 0 ?
          <div>
            <h1>Soy {myCharacter[0].name}</h1>
            <img src={myCharacter[0].img} alt='Imágen del personaje {myCharacter[0].name}' width='500px' height='700px' />
            <h2>Status: {myCharacter[0].status}</h2>
            <p>Cumpleaños: {myCharacter[0].birthday}</p>
            <h4>Occupaciones: {!myCharacter[0].createdInDb? myCharacter[0].occupation + ' ' : myCharacter[0].occupations.map(el => el.name + (' '))}</h4>
          </div>
          : <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Volver</button>
      </Link>
    </div>
  )

}
```
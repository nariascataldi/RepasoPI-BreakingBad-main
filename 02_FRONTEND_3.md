<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## ***FRONT END parte 3***
## `1` Search Bar - Barrras de busqueda
¿qué es lo que tengo que traer del Backend para las barras de busqueda?
La ruta que llega del name, y a esa lógica la traigo desde Actions
## Vamos al Action
Desde el componente [Actions](client/src/actions/index.js)
1) Creamos una funcion acción **getNameCharacters**
```js
export function getNameCharacters(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/characters?name=' + name);
      return dispatch({
        type: "GET_NAME_CHARACTERS",
        payload: json.data
      })
    } catch(error){
      console.log(error);
    }
  }
}
```
La dirección url del axios.get la obtenemos de nuestra db, por lo que abro el Postman y busco el verbo get all más por query por ejemplo: **'http://localhost:3001/characters?name=Néstor'**.
## Vamos a la lógica en el Reducer
Desde el componente [Reducer](client/src/reducer/index.js)
2) el filtrado lo hicimos desde el backend 
```js
case 'GET_NAME_CHARACTERS':
  return{
    ...state,
    characters: action.payload
  }
```
## Vamos al componente SearchBar
Desde el componente [SearchBar](client/src/components/SearchBar.jsx)
3) Importo
```js
import React from "react";
import { useState } from "react";
import { usedispatch } from "react-redux";

import { getNameCharacters } from "../actions";
```
4) exporto la funcion SearchBar, utilizo hooks
```js
export default function SearchBar(){
  const dispatch = usedispatch()
  const [name, setName] = useState("")
}
```
5) Lógica del renderizado y luego le agregamos las funciones.

  * renderizado
    ```js
      return (
      <div>
        <input
          type= 'text'
          placeholder="Buscar..."
        />
        <button type="submit">Buscar</button>
      </div>
    )
    ```
  * funciones
  ```js
  function handleInputChange(){
    e.preventDefault()
    setName(e.target.value)
    console.log(name);
  }
  ```
  se lo paso al return con un onChange
  ```js
   onChange={(e)=> handleInputChange(e)}
  ```
  y luego uno otra funcion
  ```js
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameCharacters(name))
  }
  ```
  al button le agragamos
  ```js
  <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
  ```
## Vamos al componente Home
Desde el componente [Home](client/src/components/Home.jsx)
6) Importo SearchBar
```js
import SearchBar from "./SearchBar";
```
7) lo renderizo
```js
<SearchBar/>
```
---
## **Creación del Personaje**
### Vamos a la App para setear la ruta.
Desde la [app](client/src/App.js) creamos las rutas:
```js
<Route path='/character' element = {CharacterCreate} />
<Route path='/home/:id' element={Detail} />
```
### Vamos al Componente [CharacterCreate](client/src/components/CharacterCreate.jsx)
importamos las dependecias
```js
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postCharacter, getOccupations } from '../actions/index';
```
### Vamos a las [Acciones](client/src/actions/index.js) para crear *getOccupations y postCharacter*
desde el [backend](api/src/routes/index.js) miro la direccion de occupations *router.get('/occupations', async (req, res) => {...*
**getOccupations**
```js
export function getOccupations() {
  return async function(dispatch){
    var info = await axios('http://localhost:3001/occupations', {

    });
    return dispatch({
      type: 'GET_OCCUPATIONS',
      payload: info.data
    })
  }
}
```
### Vamos al [Reducer](client/src/reducer/index.js)
creamos el caso GET_OCCUPATIONS, necesitariamos de un estado inicial
```js
const initialState = {
  characters: [], //Estado original sin mutación
  allCharacters: [],
  occupations: []
}...

case 'GET_OCCUPATIONS':
  return {
    ...state,
    occupations: actions.payload
  }
```
**postCharacter**
```js
export function postCharacter(payload) {
  return async function (dispatch) {
  const response = await axios.post('http://localhost:3001/characters', payload);
  return response;
  }
}
```
### Vamos al [Reducer](client/src/reducer/index.js)
creamos el caso POST_CHARACTER
```js
case 'POST_CHARACTER':
  return {
    ...state
  }
```
### Vamos al Componente [CharacterCreate](client/src/components/CharacterCreate.jsx)
```js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postCharacter, getOccupations } from '../actions/index';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Se requiere un nombre';
  } else if (!input.nickname) {
    errors.nickname = 'Nickname debe ser completado';
  }
  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const occupations = useSelector((state) => state.occupations)
  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: []
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }
  function handelCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value
      })
    }
  }
  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value]
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postCharacter(input))
    alert('Personaje creado')
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      occupation: []
    })
    navigate('/home')
  }
  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter(occ => occ !== el)
    })
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);
  return (
    <div>
      <Link to='/home'>
        <button>Volver</button>
      </Link>
      <h1>Creá tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type='text'
            value={input.name}
            name='name'
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>)}
        </div>
        <div>
          <label>Apodo:</label>
          <input
            type='text'
            value={input.nickname}
            name='nickname'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Cumpleaños:</label>
          <input
            type='text'
            value={input.birthday}
            name='birthday'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={input.image}
            name='image'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          {/* 'Alive', 'Deceased', 'Presumed dead', 'Unknown' */}
          <label>Estado:</label>
          <label><input
            type='checkbox'
            name='Alive'
            value='Alive'
            onChange={(e) => handelCheck(e)}
          />
            Alive</label>
          <label><input
            type='checkbox'
            name='Deceased'
            value='Deceased'
            onChange={(e) => handelCheck(e)}
          />
            Deceased</label>
          <label><input
            type='checkbox'
            name='Presumed dead'
            value='Presumed dead'
            onChange={(e) => handelCheck(e)}
          />
            Presumed dead</label>
          <label><input
            type='checkbox'
            name='Unknown'
            value='Unknown'
            onChange={(e) => handelCheck(e)}
          />
            Unknown</label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {occupations.map((occ) => (
            <option value={occ.name}>{occ.name}</option>
          ))}
        </select>

        <br />
        <button type="submit">Crear Personaje</button>

      </form>
      {input.occupation.map(el =>
        <div className="divOcc">
          <p>{el}</p>
          <button className="botonX" onClick={() => handleDelete(el)}>x</button>
        </div>
        )}
    </div>
  )

}
```
<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## FRONT END parte 1
# `1` CLIENT
1º Las *Dependencias* que vamos a necesitar para el front
- instalo

creo que se puede instalar con espacio de por medio
```
npm i redux redux-thunk react-router-dom react-redux axios redux-devtools-extension
```
```
npm i redux-thunk
```
```
npm i react-router-dom
```
```
npm i react-redux redux
```
```
npm i axios
```
```
npm i redux-devtools-extension

```


2º Creo las carpetas que necesito:
desde la terminal, parado en la carpeta [client/src](client/src):

```
mkdir store && cd store && touch index.js && cd ..
```
```
mkdir actions && mkdir reducer && mkdir components
```
**listo**
## 1- Voy al STORE
[client/src/store/index.js](client/src/store/index.js)

1) import
```js
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
```
2) en la carpeta [reducer](client/src/reducer)
creo un archivo index.js
```
touch index.js
```
armamos tipo un pequeño reducir para luego importarlo de la store.
```js
function rootReducer(){

}
export default rootReducer;
```
**listo** 
3) importamos a rootReducer
4) exportamos Store
```js
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

```
## 2- Voy al Index
[index.js](client/src/index.js)

1) Importo Provider y Store:
```js
import { Provider } from 'react-redux';
import { store } from './store';
```
el archivo raíz o el index es conveniente envolverlo con un Provider para que Redux funcione correctamente.

## 3- Voy a la App
[app.js](client/src/App.js)

1- importo 
```js
import {BrowserRouter, Route, Switch} from 'react-router-dom';
```
2- envuelvo
```js
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Breaking Bad App</h1>
    </div>
    </BrowserRouter>
  );
  ```
## 3- Vamos al Archivo de Acciones
creamos un index.js
```js
touch index.js
```
## 4- Vamos a la carpeta de `components`
```
touch Card.jsx && touch Datail.jsx && touch Home.jsx && touch LandingPage.jsx && touch Paginado.jsx && touch SearchBar.jsx && touch CharacterCreate.jsx
```
*vamos a trabajar con nuestro componente de LandinPage y con el Home*
### LandingPage
[client/src/components/LandingPage.jsx](client/src/components/LandingPage.jsx)

 * 1º IMPORTO:  
    ```js 
    import React from "react";
    import { Link } from "react-router-dom";
    ```
 * 2º Exporto la funcion LandingPage
   - 2.1º La imagen de LandingPage...algunos las pasan dentro del CSS
 * 3ª Luego me dirijo a [SRC/ACTIONS/INDEX.JS](client/src/actions/index.js)

 * LA IMAGEN DE BACKGROUND SE LA COLOCÓ EN SRC/INDEX.CSS, lo recomendable es modularizar para que cada componente tenga un fondo personalizado...

 [client/src/index.css](client/src/index.css)
me paro en **Body** y agrego:
```css
Body{
  background: url(../../bb.png);
  .
  .
  .
}
```
 ## 4- Vamos a la carpeta de `Actions`, *index.js*
1) Importo:
```js
import axios from "axios";
```
2) Exporto: ¿qué acciones voy a necesitar para exportar en mi Home? ~ mi Home, ¿qué va a hacer?
```js
export function getCharacters(){...}

```
3) El momento de la conección entre el Backend y el Frontend:
```js
export function getCharacters(){
 return async function(dispach){
  var json = await axios.get("http://localhost:3001/characters");
  // return dispach({
  //   type: 'GET_CHARACTERS',
  //   payload: json.data
  })
 } 
}
```
Aquí es dónde sucede toda la conexión, solo en estas 3 líneas.
4) Luego para despachar la acción:
```js
export function getCharacters(){
 ...
  return dispach({
    type: 'GET_CHARACTERS',
    payload: json.data
  })
 } 
```
(no vamos a hacer el archivo de constantes - es recomendable hacerlo como buena práctica)
5) Luego voy al [reducer](client/src/reducer/index.js)
 ## 5- Vamos a la carpeta de `Reducer`, *index.js*
 [reducer](client/src/reducer/index.js)
 
1) Declaro los estados: (Estaremos yendo y viniendo - puedo ir declarandolos a medida que voy recorriendo el proyecto)
```js
const initialState = {
  characters: [], //Estado original sin mutación
}
```
2) Armo la función rootReducer y la exporto
3) en la funcion rootReducer agrego las propiedades **state y action** a state la defino por default `state=initialState`. Luego armo un  **switch** con el condicional de action.type
4) case 'GET_CHARACTERS': en mi areglo vacío de characters, mandá todo lo que llegue del action character.
 Ya está la lógica de traer los characters
 ```js
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
 ```
5) Luego voy para el componente Home --> src/components/home
 ## 6- Vamos a la carpeta de `components`, *Home.jxs*
 [Home](client/src/components/Home.jsx)
 
  1) Importo React, useState, useEffect, useDispach, useSelector, el getCharacters
   vamos a estar usando Hooks.
```js
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../actions";
import { Link } from "react-router-dom"
import CharacterCard from "./Card";
```

  2) exporto la funcion Home y utilizo hooks,
  ```js
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);
  ``` 
Le declaro una consante `allCharacters` y digo con `useSelector` traeme ,en esa constante, todo lo que está en el estado de characters.

  3) Ahora traeme del estado los personajes cuando se monta:
  ````js
  useEffect {dispach... , [dispach]}
  ```` 
  montate y ejecutalo siempre y cuando tengas *dispach* (caso contrario, se genere un bucle infinito de llamado).
  Cuando hay dependecias de unas cosas y otras cosas.

  4) Renderizar - TODO: Aquí podríamos modularizar con un componente Nav.jxs 

      4.1 Importo un Link
      ```js
      import { Link } from "react-router-dom";
      ```
      4.2 agrego un return y englobo con un <div>
        ```js
        return (
          <div>
          <Link to='/character'>Crear personaje</Link>
          <h1>Aguante SALTA la linda</h1>
          <button onClick={e => { handleClick(e) }}>
            Volver a cargar todos los personajes
          </button>
          </div>
        ```
      4.3 al crear el button handleClick hay que posicionar la función arriba por ejemplo del return
      4.4 creo la función `handleClick`:
      ```js
        function handleClick(e) {
          e.preventDefault();
          dispatch(getCharacters());
        }      
      ```
      el **e.preventDefault()** es preventivo para que no se recarge la página, ya que al recargar, los estados de redux vuelven a cargar si tenemos useEffect, y por ahí dependias de algo y pum! se fué.
  5) Filtros
  agrego un **div** y veo de la consigna los tipos de filtros que necesio:
      ### Ruta principal: debe contener
      *  Input de búsqueda para encontrar personajes por nombre
      *  Área donde se verá el listado de personajes. Deberá mostrar su:
           *Imagen*
           *Nombre*
           *Nickname*
      *  Botones/Opciones para filtrar por status y por personaje existente o agregado por nosotros
      *  Boton/Opcion para ordenar tanto ascendentemente como descendentemente los personajes por orden alfabético
      *  Paginado para ir buscando y mostrando los siguientes personajes

  Para mandar las cosas por pageload necesito crear una etiqueta **`value='asc'`** .
  El value me permite acceder y preguntar después; para poder unir la lógica del (ascendente y desendente)
  ```js
  <div>
        //aquí entrarían los filtros
        <select>
          <option value='asc'>Ascendente</option>
          <option value='des'>Descendente</option>
        </select>
        <select>
          <option value='gen'>Todos</option>
          <option value='vid'>Creados</option>
          <option value='vid'>Existente</option>
        </select>
        <select>
          <option value="All">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Deceased">Muerto</option>
          <option value="Unknown">Desconocido</option>
          <option value="Presumed dead">Probablemente muerto</option>
        </select>
        // {
        //   allCharacters?.map(el => {
        //     return (
        //       <Fragment>
        //         <Link to={"/home/" + el.id}>
        //           <Card name={el.name} image={el.img} nickname={el.nickname} /> //este componente no funciona

        //         </Link>
        //       </Fragment>
        //     )
        //   })
        // }
      </div>
  ```
  en donde están los filtros a las opciones hay que agregar un value para luego poder llamarlos
  6) Luego voy al componente de **Card** 
  [client/src/components/Card.jsx](client/src/components/Card.jsx)
  7) importo el componente Card para luego renderizarlo

 ## 6- Vamos a la carpeta de `components`, *Card.jxs*
  [client/src/components/Card.jsx](client/src/components/Card.jsx)

  1) importo React
```js
import React from "react";
```
  2) exporto la funcion Card
  La Card renderiza lo que necesito.
  3) todo esto lo traigo por props por lo que no necesito traer estado, toda la lógica se hizo en el Home
  4) Luego voy al Home a importar este componente --> src/components/home - sería el paso 7º importo el componente Card para luego renderizarlo

 ## 8- Vamos a la carpeta de `components`, *Home.jxs* para importar Card
 [Home](client/src/components/Home.jsx)
  1) importo el componente Card
  ```js
  import Card from "./Card";
  ```
  2) renerizo:
```js
        {
          allCharacters?.map(el => {
            return (
              <Fragment>
                <Link to={"/home/" + el.id}>
                  <Card name={el.name} image={el.img} nickname={el.nickname} /> //este componente no funciona

                </Link>
              </Fragment>
            )
          })
        }
```
## 9- Hacemos el Ruteo vamos al app.js
[client/src/App.js](client/src/App.js)

1) importamos
 ```js
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import { Route, Switch } from "react-router";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
 ```
2) englobamos con Switch

 ```js
function App() {   
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' element={LandingPage} />
          <Route path='/home' element={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
 ```
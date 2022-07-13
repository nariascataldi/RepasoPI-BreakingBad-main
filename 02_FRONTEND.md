<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## FRONT END
# `1` CLIENT
1º Las *Dependencias* que vamos a necesitar para el front
- instalo
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
## 4- vamos a la carpeta de `components`
```
touch Card.jsx && touch Datail.jsx && touch Home.jsx && touch LandingPage.jsx && touch Paginado.jsx && touch SearchBar.jsx && touch CharacterCreate.jsx
```
*vamos a trabajar con nuestro componente de LandinPage y con el Home*
### LandingPage
[client/src/components/LandingPage.jsx](client/src/components/LandingPage.jsx)

 * 1º IMPORTO REACT (LA PRIMERA CON MAYUSCULAS), {LINK}
 * 2º EXPORTO LA FUNCION LANDINGPAGE
 * 2.1º LA IMÁGEN DEL LANDINGPAGE...ALGUNOS LA PASAN DENTRO DEL CSS
 * 3ª LUEGO ME DIRIJO A SRC/ACTIONS/INDEX.JS  
 * LA IMAGEN DE BACKGROUN SE LA COLOCÓ EN SRC/INDEX.CSS
 
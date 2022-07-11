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
## Voy al STORE
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

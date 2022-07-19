<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## FRONT END parte 2
# `1` Paginado
A los filtros conviene hacerlos desde el backend ya que desde el Front no es escalable.
Lo primero que vamos a hacer es crear varios estados locales para el paginado.
Las definiremos en Ingles
## Variables locales - vamos al Home
Desde el componente [Home](client/src/components/Home.jsx)

1) creamos una constante dónde indique una página actual y luego otra que setee la página. esta arranca en la primera página
```js
  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1); //el 1 para arrancar en la página 1°
  const [charactersPerPage, setCharactersPerPage] = useState(6);
```
2) creo una constante para llamar la cantidad de los personajes - en este caso 6
3) creo índice del último personaje y un índice para el primer personaje.
```js
  const indexOfLastCharacter = currentPage * charactersPerPage; 
  const indexOfFirstChararcter = indexOfLastCharacter - charactersPerPage;
```
4) creo una constante que guarde todos los personajes que están en la página actual.
```js
  const currentCharacters = allCharacters.slice(indexOfFirstChararcter, indexOfLastCharacter);
```
allCharacters es el arreglo del estado viene de 
```js
... useSelector((state) => state.characters);
```
traido del [reducer](client/src/reducer/index.js)
El **.slice()** toma na porción del parámetro que le pasemos. 
5) creamos la constante de paginado, que no va a ayudar en el páginado
```js
  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  };
```
todo esto lo estamos haciendo desde el Home ya que luego lo vamos a renderizar (desde el home) - vara verlo más claro.
7) Nos dirigimos al componente [Paginado.jsx](client/src/components/Paginado.jsx)
### Paginado.jsx
```js
import React from "react";

export default function Paginado({ charactersPerPage, allCharracters, paginado }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allCharracters/charactersPerPage); i++) {
    pageNumber.push(i)
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
        pageNumber.map(number =>(
          <li className="number" key={number}>
          <a onClick={()=> paginado(number)}>{number}</a>
          </li> 
        ))}
      </ul>
    </nav>
  )
}
```
* Importamos React
* exportamos la función Paginado, hacemos un desructuring de las propiedades del otro componente (Home)
* Declaro un arreglo vacío
* recorro el arreglo tomando el número redondo al dividir (todos los personajes sobre los personajes por página)
* a eso lo agregamos a nuestro pageNamber. Un arreglo de números que tendrá los resultados del for.
**genial**
* Renderizo:
  * Pregunto: ¿si tengo el pageNumber (arreglo)? true
  * entonces mapeamelo por cada uno de los numeritos que nos devuelva el páginado

8) Nos dirigimos al componente [Home](client/src/components/Home.jsx): 
### Home.jsx
  * importar este componente Paginado
  ```js
  import Paginado from "./Paginado";
  ```
  * lo renderizamos - (pasar en las props)
  ```js
  <Paginado
    charactersPerPage={charactersPerPage}
    allCharracters={allCharacters.length}
    paginado={paginado}
  />
  ```
9) cambiamos el código dónde renderizamos allCharacters, ya que no necesito mapear a todos mis personajes, solo aquellos que me devuelva mi paginado. Entonces:

  * veo las constantes que tengo arriba:
  ```js
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  const [currentPage, setCurrentPage] = useState(1); //el 1 para arrancar en la 1° página
  const [charactersPerPage, setCharactersPerPage] = useState(6); //6 personajes por página
  const indexOfLastCharacter = currentPage * charactersPerPage; //caso 1: 6 = 1 * 6
  const indexOfFirstChararcter = indexOfLastCharacter - charactersPerPage;//caso 1: 0 = 6 - 6
  const currentCharacters = allCharacters.slice(indexOfFirstChararcter, indexOfLastCharacter);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };
  ```
  * Tomo aquella que corta a todos los personajes por el paginado y modifico
  ```js
  {allCharacters?.map((c) => {
  return (...
  ```
  por

  ```js
{currentCharacters?.map((c) => {
  return (
    <Fragment>
      <Link to={"/home/" + c.id}>
        <Card name={c.name} image={c.img ? c.img : <img src="https://i.pinimg.com/originals/66/88/f8/6688f8dc71df44c68bd0cf0eb1f5ee8c.jpg" alt="Imagen no encontrada"/>} nickname={c.nickname} key={c.id} />
      </Link>
    </Fragment>
  ```
  a la imágen colocamos una por default con el operador ternario.
  10) **ESTILO**
  Para el estilo momentaneamente le daremos un estilo horizontal a la nav
  ### [Index.css](client/src/index.css)
  Traido de la página https://desarrolloweb.com/articulos/barra-navegacion-horizontal-listas-css.html 
  ```css
  nav ul{
    list-style-type: none;
    text-align: center;
  }
  nav li{
    display: inline;
    text-align: center;
    margin: 0 10px 0 0;
  }
  nav li a {
    padding: 2px 7px 2px 7px;
    color: #666;
    background-color: #eeeeee;
    border: 1px solid #ccc;
    text-decoration: none;
  }
  nav li a:hover{
    background-color: #333333;
    color: #ffffff;
  }
  ```

# `2` Filtros
Para hacer la lógica del filtrado, necesitaría ir a las acciones.
Vamos al archivo [index](client/src/actions/index.js) de actions
## Filtro por Status
### Actions
```js
export function filterCharactersByStatus(payload){
  return {
    type: 'FILTER_BY_STATUS',
    payload
  }
}
```
vamos a [Reducer](client/src/reducer/index.js)
### Reducer
```js
case 'FILTER_BY_STATUS':
  const allCharacters = state.characters;
  const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
  return {
    ...state,
    characters: statusFiltered
  }
```
vamos al [Home](client/src/components/Home.jsx)
### Home
creo una función antes del return
```js
  function handelFilterStatus(e){
    dispatch(filterCharactersByStatus(e.target.value))
  }
```
vamos al select
```js
<select onChange={e => handleFilterStatus(e)}>
  <option value="All">Todos</option>
  ...
</select>
```
vamos al [Reducer](client/src/reducer/index.js)
### Reducer
¿cómo hacer un filtro que lo vuelva a todos los personajes y no solo a los personajes ya filtrados?
opción 1:
```js
const initialState = {
  characters: [],
  allCharacters: [],
}
...case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload
      }
```
## Filtro por Created
### Actions
Vamos al archivo [index](client/src/actions/index.js) de actions
```js
creamos nuestra función
export function filterCreated(payload){
  return {
    type: 'FILTER_CREATED',
    payload
  }
}
```
### Reducer
Vamos al [reducer](client/src/reducer/index.js)
```js
case 'FILTER_CREATED':
  const allCharactersC = state.allCharacters;
  const createdFilter = action.payload === 'created' ? allCharactersC.filter((el) => el.createdInDb) : allCharactersC.filter((el) => !el.createdInDb);
  return {
    ...state,
    characters: action.payload === 'All' ? state.allCharacters : createdFilter
  }
```
### Home
importo filterCreated
```js
import { filterCharactersByStatus, getCharacters, filterCreated } from "../actions";
```
creo la función con su dispatch
```js
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
  }
```
luego al selection
```js
  <select onChange={e => handleFilterCreated(e)}>
    <option value='All'>Todos</option>
    <option value='created'>Creados</option>
    <option value='api'>Existente</option>
  </select>
```

## Filtro por Orden
### Actions
Vamos al archivo [index](client/src/actions/index.js) de actions
```js
creamos nuestra función
export function orderByName(payload){
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}
```
### Reducer
Vamos al [reducer](client/src/reducer/index.js)
```js
case 'ORDER_BY_NAME':
  let sortedArr = action.payload === 'asc' ? 
  state.allCharacters.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    } return 0;
  }) :
  state.allCharacters.sort(function (a, b) {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    } return 0;
  })

   return {
        ...state,
        characters: sortedArr
      }
```
### Home
importo orderByName
```js
import { filterCharactersByStatus, getCharacters, filterCreated, orderByName } from "../actions";
```
creo una constante **setOrden**
```js
const [orden, setOrden] = useState('');
```
creo la función con su dispatch
```js
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }
```
luego al selection
```js
<select onChange={e => handleSort(e)}>
  <option value='asc'>Ascendente</option>
  <option value='des'>Descendente</option>
</select>
```
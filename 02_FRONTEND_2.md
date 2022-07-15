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
  for (let i = 0; i <= Math.ceil(allCharracters/charactersPerPage); i++) {
    pageNumber.push(i + 1)
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
          return (...

  ```
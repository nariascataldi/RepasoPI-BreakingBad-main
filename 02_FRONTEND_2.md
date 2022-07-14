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
...
  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1); //el 1 para arrancar en la página 1°
  const [charactersPerPage, setCharactersPerPage] = useState(6);
...
```
2) creo una constante para llamar la cantidad de los personajes - en este caso 6
3) creo índice del último personaje y un índice para el primer personaje.
```js
...
  const indexOfLastCharacter = currentPage * charactersPerPage; 
  const indexOfFirstChararcter = indexOfLastCharacter - charactersPerPage;
```
4) creo una constante que guarde todos los personajes que voy a traer de cada página
```js
...
  const currentCharacters = allCharacters.slice(indexOfFirstChararcter, indexOfLastCharacter);
```

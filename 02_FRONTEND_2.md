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

1) creamos una constante dónde indique una página actual y luego otra que setee la página.
```js
...
  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
...

```
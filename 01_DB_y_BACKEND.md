<p align="left">
  <img height="200" src="./bb.png" />
</p>

# Breaking Bad - repaso para el proyecto individual de Soy Henry

## Pretendo dar un paso a paso de como construir una App utlizando React, Redux, Node y Sequelize.

# `1`

`1.1-` En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=pi_henry
DB_PASSWORD=soyhenry
DB_HOST=localhost
```
 Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

`1.2-` Adicionalmente será necesario que creen desde psql una base de datos llamada `breakingbad`


# Crear una Base de Datos - POSTGRESQL

## Creamos el usuario

En este ejemplo el usuario se va a llamar **pi_henry**

```
sudo -iu postgres createuser -P --interactive pi_henry

```
1. Nos pedira la contraseña del `sudo`.
2. Contraseña para `pi_henry`: `soyhenry`.

Listo ya tenemos inicializado un usuario en postgresql.


## Creamos una base de datos - `breakingbad`

Tenemos que llamarlo como figura en nuestra api/src/db.js : **breakingbad**
```js
`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/breakingbad,`
```
Entonces:

```
createdb breakingbad -O pi_henry
```
Listo, hemos creado la una base de datos `breakingbad` alojada en `pi_henry`.

### Para mirar que onda

```
psql breakingbad
```
***Eso es todo***

### Datos de color

Host = localhost

db_Port = 5432

# `2` Modelos

En **[api/src/db.js](api/src/db.js)** generamos nuestra conexión local.


Listo, momento de dirigirnos a **[api/src/models/Character.js](api/src/models/Character.js)**

Aquí el modelo charcater será nuestra entidad y por medio de sequelize definimos la tabla.

**`Del enunciado`**

__Base de datos__
El modelo de la base de datos deberá tener las siguientes *entidades* (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] *Personaje* con las siguientes propiedades:
  - ID *
  - Nombre *
  - Nickname *
  - Cumpleaños *
  - Status
  - Imagen
  
veo la api [https://breakingbadapi.com/api/characters](https://breakingbadapi.com/api/characters) para saber como llegará la información.

- `0:`
  - **char_id:**	1
  - **name:**	"Walter White"
  - **birthday:**	"09-07-1958"
  - **occupation:**	[…]
  - **img:**	"https://images.amcnetwor…1000_walter-white-lg.jpg"
  - **status:**	"Presumed dead"
  - **nickname:**	"Heisenberg"
  - **appearance:**	[…]
  - **portrayed:**	"Bryan Cranston"
  - **category:**	"Breaking Bad"
  - **better_call_saul_appearance:**	[]
- `1: `{...}

**creo un nuevo archivo dentro de models**

Abro la terminal y me paro en la carpeta:
*RepasoPI-BreakingBad-main/api/src/models*

### Creación entidad Ocupación
```
touch Occupation.js
```

- [ ] *Ocupación* con las siguientes propiedades:
  - ID
  - Nombre

Al definir la entidad me aseguro que esté en Ingles singular ya que luego sequelize en su listado de palabras convertirá al prural, caso contrario deveremos congelar la entidad con freezeTableName y stearlo a true. 

## Test
veamos en **psql**
abro la consola `(ctrl + j)`,ó sino por **`pgAdmin`**.
```
psql breakingbad
```
psql (14.4 (Ubuntu 14.4-1.pgdg22.04+1))
Digite «help» para obtener ayuda.
```
breakingbad=# \dt
```

#### Listado de relaciones

<pre>          Listado de relaciones
 Esquema |   Nombre    | Tipo  |  Dueño   
---------+-------------+-------+----------
 public  | characters  | tabla | pi_henry
 public  | occupations | tabla | pi_henry
(2 filas)
</pre>


<pre>breakingbad=# SELECT * FROM public.characters
ORDER BY id ASC;
</pre>

#### tabla characters
<pre> id | name | nickname | birthday | status | img | createdInDb | createdAt | updatedAt 
----+------+----------+----------+--------+-----+-------------+-----------+-----------
(0 filas)</pre>

# `3` Realaciones de los modelos
Dentro del archivo [db.js](api/src/db.js) 
### Del Readme
*La relación entre ambas entidades debe ser de muchos a muchos (`.belongsToMany`) ya que un personaje puede tener varias "ocupaciones" en simultaneo y, a su vez, una "ocupación" puede corresponder a múltiples personajes. Por ejemplo, Kimberly Wexler es 'lawyer', pero a su vez existen otros personajes con esa ocupación.*



# `4` Ruta Character - get all
## Api

[index.js](api/src/routes/index.js)
## Consigna
Se debe desarrollar un servidor en *Node/Express* con las siguientes rutas:

- [ ] __GET /characters__:
  - Obtener un listado de los primeros 6 personajes
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /characters?name="..."__:
  - Obtener un listado de los primeros 6 personajes que contengan la palabra ingresada como query parameter
  - Si no existe ningun personaje mostrar un mensaje adecuado
- [ ] __GET /character/{idPersonaje}__:
  - Obtener el detalle de un personaje en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de personaje
  - Incluir las ocupaciones asociadas
- [ ] __POST /character__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de personaje por body
  - Crea un personaje en la base de datos
#### Consejos y el Plan:
  *la forma en que encara **Selene Bruno** este BackEnd es:*
  - Cuando al armar la ruta de `getCharacter`, traigo todo.
  Ya que *paginado, filtros y ordenamiento* será realizado en el `FrontEnd`.
  1) lo escribo para que funcione,
  2) luego terminado comienzo a modularizar.
    2.1 Por cada una tipo de ruta esta bueno armar un archivo.
  3) También puedo utlitilizar try / catch
  - Hacer las funciones, *-funciones controladoras-* que traigan la información
  - y luego en la ruta invocarlas.

### Axios
Como trabajamos de manera asíncrona, necesitaremos de `axios`.

**Instalamos la dependecia axios**
Desde la terminal parados en api:
```
npm i axios
```
si usamos fech no es necesario.

y luego lo importamos en el backend de la ruta [index.js](api/src/routes/index.js)

```
const axios = require('axios');
```
Creo una función `getApiInfo`dónde luego agrego dos constantes `apiUrl` y `apiInfo`.
En `apiUrl` asigno la dirección del Endpoint/Flag https://breakingbadapi.com/api/characters .
En `apiInfo` asigno los datos que necesite (de esta menera la solicitud de datos será más liviana).
*Para realizar correctamente los datos a levantar*
1) voy a la dirección de la api:
https://breakingbadapi.com/api/characters
veo lo que me devuelve y 
2) realizo las relaciones.

- `0:`
  - **char_id:**	1
  - **name:**	"Walter White"
  - **birthday:**	"09-07-1958"
  - **occupation:**	[…]
  - **img:**	"https://images.amcnetwor…1000_walter-white-lg.jpg"
  - **status:**	"Presumed dead"
  - **nickname:**	"Heisenberg"
  - **appearance:**	[…]
  - **portrayed:**	"Bryan Cranston"
  - **category:**	"Breaking Bad"
  - **better_call_saul_appearance:**	[]
- `1: `{...}

## `Base de datos`
Creo una constante `getDbInfo` que tiene un arrow function donde espera información de la db por lo que agrego el await. En ella quiero incluir de la tabla Occupation el atributo name. `through` es a los atributos *Occupation* relacionalos con mi tabla entidad *Character* y soló trae los atributos name, no el resto.


## Concatenamos API y DB
Declaro dos variables con el valor de los get y luego los concatenamos con una nueva variable llamada `infoTotal`.

## creamos la ruta get('/characters')
aquí podemos unfificar la dirección con la de busqueda por query
#### Consejo:
  - Unificar la busqueda con un `.toLowerCase` ya que es key sensitive.

*Al llamar nuestar db la tengo que requerir desde ../db*

### Postman
Del Postman creo una nueva colección, la llamo `Repaso PI Breaking Bad` donde agregare los requerimientos.
Lo llamaré: CharactersAll and Query

Utilizo un GET y la url es http://localhost:3001/characters

Luego hago un click a *send*, y como resultado son todos los characters.

para revisar el query: en la solapa de Params
le paso el query params
**`Key:`** `name` y **`Value:`** `walter` por ejemplo. Y tiene que traer al hacer click en *send* dos valores Walter y Walter Jr.
url query ejemplo http://localhost:3001/characters?name=WAlter

# `5` Ruta Occupation - get all en db
## Consigna
- [ ] __GET /ocupaciones__:
  - Obtener todas las ocupaciones posibles
  - En una primera instancia deberán obtenerlas desde la API externa y guardarlas en su propia base de datos y luego ya utilizarlas desde allí.

veo la api [https://breakingbadapi.com/api/characters](https://breakingbadapi.com/api/characters) para saber como llegará la información.
- `0:`
  - char_id:	1
  - name:"Walter White"
  - birthday:	"09-07-1958"
  - **occupation:** ["High School Chemistry Teacher", "Meth King Pin"]

# `6` Rutas get By Id and post.
## POST
Vamos por el post
1) Dentro del archivo [index.js](api/src/routes/index.js) creo una petición de `post` para la ruta `/characters`.

2) Creo una constante destructuring {} que requiere del body datos para ser agregados a la db.
`const destructuring` veo el modelo [character](api/src/models/Character.js) y busco aquellos que estan en *allowNull: false* ya que serán requeridos por nuestra db y los otros ítems puedo o no agregarlos como ejemplo image.
```js
let {
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
    occupation
  } = req.body;
```

3) con `create` asigno a mi db los valores que requerí del body
4) al *create* no le pase occupation ya que el la tabla entidad Occupation tengo todos las ocupaciones posibles de la API por lo que con un `findAll`las busco para agregarlas.

```js
let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb
  })
  let occupationDb = await Occupation.findAll({ where: { name: occupation } })
  characterCreated.addOccupation(occupationDb);
  ```
5) utilizo el método de sequelize add + nombre de la tabla entidad.
6) respondo con un envió de mensaje.

## Vamos al Postman
desde la terminal/consola
```
postman
```
agrego un reques


**POST** http://localhost:3001/characters

en la solapa Body veo que esté seleccionado `raw` y `JSON` para la escritura y agrego un nuevo charcater.
```js
{
    "name" : "Néstor",
    "nickname": "NAC",
    "birthday": "04-08-1983",
    "img": "https://i.pinimg.com/originals/66/88/f8/6688f8dc71df44c68bd0cf0eb1f5ee8c.jpg",
    "status":"Alive",
    "occupation": ["Layer", "Teenager"]
}
```
## GET BY ID
1) Creamos una ruta get con la dirección ('characters/:id', async...).
2) Creo una variable y utilizo la función ya creada de traer a todos los personajes.
3) Coloco un filter donde el elemento id sea exactamente igual al id brindando por params
4) Compruebo si hay personaje lo muestro caso contrario asigno el error 404 de no hallado.
5) Listo, ya está para probarlo con un postman
### Postman
Abro Postman, y agrego un request de `GET` con la dirección http://localhost:3001/characters/.
en la dirección agrego un valor id ejemplo:
```
http://localhost:3001/characters/2
```
y tiene que dar como resultado (ver que esté `body -> pretty -> JSON` seleccionados):
```json
[
    {
        "id": 2,
        "name": "Jesse Pinkman",
        "birthday": "09-24-1984",
        "occupation": [
            "Meth Dealer"
        ],
        "img": "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
        "status": "Alive",
        "nickname": "Cap n' Cook",
        "appearance": [
            1,
            2,
            3,
            4,
            5
        ]
    }
]
```

# `LISTO  con esto se terminó el BackEnd`
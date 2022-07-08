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
```
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

  - **name**	"Walter White"
  - **birthday**	"09-07-1958"
  - **occupation**	[…]
  - **img**	"https://images.amcnetwor…1000_walter-white-lg.jpg"
  - **status**	"Presumed dead"
  - **nickname**	"Heisenberg"
  - **appearance**	[…]
  - **portrayed**	"Bryan Cranston"
  - **category**	"Breaking Bad"
  - **better_call_saul_appearance**	[]

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



# `4` 
# `5`
# `6`
# `7`
# `8`
# `9`

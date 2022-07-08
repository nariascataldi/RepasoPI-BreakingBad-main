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
- [ ] *Ocupación* con las siguientes propiedades:
  - ID
  - Nombre

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

# `3` 
# `4` 
# `5`
# `6`
# `7`
# `8`
# `9`

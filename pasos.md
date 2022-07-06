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

# `2`


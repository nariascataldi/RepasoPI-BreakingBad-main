import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCharacters } from "../actions";
import { Link } from "react-router-dom";
import CharacterCard from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters); 

  useEffect(() => {
    dispatch(getCharacters()) //esto es lo mismo que hacer el match dispach to props
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  return (
    <div>
      <Link to='/character'>Crear personaje</Link>
      <h1>Aguante SALTA la linda</h1>
      <button onClick={e => { handleClick(e) }}>
        Volver a cargar todos los personajes
      </button>
      <div>
        //aquí entrarían los filtros
        <select>
          <option value='asc'>Ascendente</option>
          <option value='des'>Descendente</option>
        </select>
        <select>
          <option value='gen'>Género</option>
          <option value='vid'>Videojuego</option>
        </select>
        <select>
          <option value="all">Todos</option>
          <option value="cre">Creados</option>
          <option value="api">Existente</option>
        </select>
        {
          allVideogames?.map(el => {
            return (
              <Fragment>
                <Link to={"/home/" + el.id}>
                  <VideogameCard name={el.name} image={el.img} genre={el.genre} /> //este componente no funciona

                </Link>
              </Fragment>
            )
          })
        }
      </div>
    </div>
  )
};


/**
 * 1º importo React, useState, useEffect, useDispach, useSelector, el getCharacters
 *  vamos a estar usando Hooks
 * 2º exporto la funcion Home y utilizo hooks
 * 3º useEffect {dispach... , []}
 * 4º renderizo
 * 5º en donde están los filtros a las opciones hay que agregar un value para luego poder llamarlos
 * 6º Luego voy al componente de Card --> scr/components/card
 * 
 * 7º importo el componente VideogameCard para luego renderizarlo
 */
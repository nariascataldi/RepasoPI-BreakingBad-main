import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCharacters } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {

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
        {/* //aquí entrarían los filtros */}
        <select>
          <option value='asc'>Ascendente</option>
          <option value='des'>Descendente</option>
        </select>

        <select>
          <option value="All">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Deceased">Muerto</option>
          <option value="Unknown">Desconocido</option>
          <option value="Presumed dead">Probablemente muerto</option>
        </select>

        <select>
          <option value='All'>Todos</option>
          <option value='created'>Creados</option>
          <option value='api'>Existente</option>
        </select>

        <Paginado
          charactersPerPage={charactersPerPage}
          allCharracters={allCharacters.length}
          paginado={paginado}
        />

        {currentCharacters?.map((c) => {
          return (
            <Fragment>
              <Link to={"/home/" + c.id}>
                <Card name={c.name} image={c.img} nickname={c.nickname} key={c.id} />
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
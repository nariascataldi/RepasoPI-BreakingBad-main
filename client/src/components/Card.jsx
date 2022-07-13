import React from "react";

export default function Card({ name, image, nickname }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{nickname}</h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  )
}

/**
 * 1º importo React
 * 2ª exporto la funcion Card
 * 3º todo esto lo traigo por props por lo que no necesito traer estado, toda la lógica se hizo en el Home
 * 4º Luego voy al Home a importar este componente --> src/components/home
 */
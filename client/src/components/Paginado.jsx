import React from "react";

export default function Paginado({ charactersPerPage, allCharracters, paginado }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(allCharracters / charactersPerPage); i++) {
    pageNumber.push(i + 1)
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map(number => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  )
}
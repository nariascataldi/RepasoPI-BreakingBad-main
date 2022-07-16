import React from "react";
import { useState } from "react";
import { useDispach } from "react-redux";

import { getNameCharacters } from "../actions";

export default function SearchBar() {
  const dispach = useDispach()
  const [name, setName] = useState("")

  return (
    <div>
      <input
        type= 'text'
        placeholder="Buscar..."
      />
      <button type="submit">Buscar</button>
    </div>
  )
}
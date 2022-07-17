import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';

import { getNameCharacters } from "../actions";

export default function SearchBar() {
  const dispach = useDispatch(" ")
  const [name, setName] = useState(" ")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispach(getNameCharacters(name))
  }
  return (
    <div>
      <input
        type='text'
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
}
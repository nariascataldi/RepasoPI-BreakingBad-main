import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postCharacter, getOccupations } from '../actions/index';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Se requiere un nombre';
  } else if (!input.nickname) {
    errors.nickname = 'Nickname debe ser completado';
  }
  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const occupations = useSelector((state) => state.occupations)
  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: []
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }
  function handelCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value
      })
    }
  }
  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value]
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postCharacter(input))
    alert('Personaje creado')
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      occupation: []
    })
    navigate('/home')
  }
  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter(occ => occ !== el)
    })
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);
  return (
    <div>
      <Link to='/home'>
        <button>Volver</button>
      </Link>
      <h1>Creá tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type='text'
            value={input.name}
            name='name'
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>)}
        </div>
        <div>
          <label>Apodo:</label>
          <input
            type='text'
            value={input.nickname}
            name='nickname'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Cumpleaños:</label>
          <input
            type='text'
            value={input.birthday}
            name='birthday'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={input.image}
            name='image'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          {/* 'Alive', 'Deceased', 'Presumed dead', 'Unknown' */}
          <label>Estado:</label>
          <label><input
            type='checkbox'
            name='Alive'
            value='Alive'
            onChange={(e) => handelCheck(e)}
          />
            Alive</label>
          <label><input
            type='checkbox'
            name='Deceased'
            value='Deceased'
            onChange={(e) => handelCheck(e)}
          />
            Deceased</label>
          <label><input
            type='checkbox'
            name='Presumed dead'
            value='Presumed dead'
            onChange={(e) => handelCheck(e)}
          />
            Presumed dead</label>
          <label><input
            type='checkbox'
            name='Unknown'
            value='Unknown'
            onChange={(e) => handelCheck(e)}
          />
            Unknown</label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {occupations.map((occ) => (
            <option value={occ.name}>{occ.name}</option>
          ))}
        </select>

        <br />
        <button type="submit">Crear Personaje</button>

      </form>
      {input.occupation.map(el =>
        <div className="divOcc">
          <p>{el}</p>
          <button className="botonX" onClick={() => handleDelete(el)}>x</button>
        </div>
        )}
    </div>
  )

}
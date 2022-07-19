import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch])

  const myCharacter = useSelector((state) => state.detail)
  return (
    <div>
      {
        myCharacter.length > 0 ?
          <div>
            <h1>Soy {myCharacter[0].name}</h1>
            <img src={myCharacter[0].img} alt='Imágen del personaje {myCharacter[0].name}' width='500px' height='700px' />
            <h2>Status: {myCharacter[0].status}</h2>
            <p>Cumpleaños: {myCharacter[0].birthday}</p>
            <h4>Occupaciones: {!myCharacter[0].createdInDb? myCharacter[0].occupation + ' ' : myCharacter[0].occupations.map(el => el.name + (' '))}</h4>
          </div>
          : <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Volver</button>
      </Link>
    </div>
  )

}
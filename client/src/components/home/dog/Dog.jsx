import React from 'react';
import { Link } from "react-router-dom";
import style from "./dog.module.css";

const Dog = ({image, name, temperament, weightMin, weightMax, averageWeight, id}) => {
  return (
    <div className={style.card}>
      <Link to= {`/detail/${id}`}>
        <img className={style.photo} src={image} alt={name} width='200px' height='200px'/>
      </Link>
      <h3>{name}</h3>
      <h4>Temperament:</h4>{temperament}
      <br />
      <h4>Min weight: </h4> {weightMin}
      <br/>
      <h4>Max weight: </h4> {weightMax}
      <br />
      <h4>Average weight: </h4> {averageWeight}
    </div>
  )
}

export default Dog;
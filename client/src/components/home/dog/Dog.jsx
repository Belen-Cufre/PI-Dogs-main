import React from 'react';
import { Link } from "react-router-dom";
import style from "./dog.module.css";

//Dumb component
const Dog = ({image, name, temperament, weightMin, weightMax, averageWeight, id}) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <Link to= {`/detail/${id}`}>
            <img src={image} alt={name} width='200px' height='200px'/>
        </Link>
        <h3>{name}</h3>
        <h4>Temperament: <h6>{temperament}</h6></h4>
        <h5>Min weight: {weightMin}</h5>
        <h5>Max weight: {weightMax}</h5>
        <h5>Average weight: {averageWeight}</h5> 
      </div>
    </div>
  )
}

export default Dog;
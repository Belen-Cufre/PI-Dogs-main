import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {getAllBreeds} from "../../../redux/actions/index"
import Dog from "../dog/Dog"

const AllDogs = () => {
  const dispatch= useDispatch();
  const dogs= useSelector(state => state.dogs);

  // I have to fill my dogs state with the info form my Back. I use the action I created to do this

  useEffect(()=> {
    dispatch(getAllBreeds())
  }, []);

  //All the logic done, I return what I want to be rendered

  return (
    <div>
      {
        dogs.map(dog=> {
          return <Dog
          key= {dog.id}
          image= {dog.image}
          name= {dog.name}
          temperament= {dog.temperament}
          weight= {dog.weight.metric}
          />
        })
      }    
    </div>
  )
}

export default AllDogs
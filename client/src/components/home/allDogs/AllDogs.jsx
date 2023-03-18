import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterByOrigin, getAllBreeds, orderByName} from "../../../redux/actions/index"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';
import Temperaments from "../temperaments/Temperaments";

//This function has the complete logic of /home path

const AllDogs = () => {

  //I create all the consts I need to use in this function

  const dispatch= useDispatch();
  const dogs= useSelector(state => state.dogs);
  const [order, setOrder]= useState('')
  const [currentPage, setCurrentPage]= useState(1) //I start always on page 1
  const [dogsPerPage, setDogsPerPage] = useState(8) //this number 8 is the amount of dogs I want to show per page
  const numOfLastDog= currentPage * dogsPerPage;
  const numOfFirstDog= numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

  //I create all the functions
  
  const pagination= (page) => {setCurrentPage(page)}

  const handleOrder1= (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2= (event) => {
  //   event.preventDefault();
  //   dispatch(orderByWeight(event.target.value));
  //   setCurrentPage(1)
  //   setOrder(`Ordered ${event.target.value}`);
  }



  const handleFilterByOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value))
  }

  // I have to fill my dogs state with the info form my Back. I use the action I created to do this

  useEffect(()=> {
    dispatch(getAllBreeds())
  }, []);







  //All the logic done, I return what I want to be rendered
  //Orders: by name (OK), by weight (DONE, BUT NOT WORKING!)
  //Filter by DB (DONE, BUT NOT WORKING!)
  //Filter by temperament-PENDING
  //Pagination numbers-OK
  //Dogs card as individual units-OK

  return (
    <div>

      <select onChange={event =>{handleOrder1(event)}}>
        <option value="a-z">Order from A to Z</option>
        <option value="z-a">Order from Z to A</option>
      </select>
      <select onChange={event =>{handleOrder2(event)}}>
        <option value="+">Order from heavier to lighter</option>
        <option value="-">Order from lighter to heavier</option>
      </select>


      <select onChange={event => {handleFilterByOrigin(event)}}>
        <option value="All">All dogs</option>
        <option value="api">Api dogs</option>
        <option value="from_DB">My dogs</option>
      </select>







      <Pagination
      dogsPerPage= {dogsPerPage}
      dogs= {dogs.length}
      pagination= {pagination} />


      {
        currentDogs?.map(dog=> {
          return (
          <Dog
          key= {dog.id}
          image= {dog.image}
          name= {dog.name}
          temperament= {dog.temperament}
          weight= {dog.weight.metric}
          />
          )
        })
      }    
    </div>
  )
}

export default AllDogs
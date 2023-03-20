import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterByOrigin, getAllBreeds, orderByName, orderMinFromMin, orderMinFromMax, orderMaxFromMin, orderMaxFromMax, orderAverageFromMin, orderAverageFromMax, filterByTemper, getAllTemperaments} from "../../../redux/actions/index"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';


//This function has the complete logic of /home path

const AllDogs = () => {

  //I create all the consts I need to use in this function

  const dispatch= useDispatch();
  const dogs= useSelector(state => state.dogs);
  const [order, setOrder]= useState('')
  const [temperament, setTemperament]= useState('all')

  const [currentPage, setCurrentPage]= useState(1) //I start always on page 1
  const [dogsPerPage, setDogsPerPage] = useState(8) //this number 8 is the amount of dogs I want to show per page
  const numOfLastDog= currentPage * dogsPerPage;
  const numOfFirstDog= numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

  //I create all the functions
  
  const pagination= (page) => {setCurrentPage(page)}

  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
        if (a < b) return -1;
        else return 1;
    })


  const handleOrder1= (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2 = (event) =>{
    if (event.target.value === "min-min"){
      dispatch (orderMinFromMin(event.target.value))
    }
    if (event.target.value === "min-max"){
      dispatch (orderMinFromMax(event.target.value))
    }
    if (event.target.value === "max-min"){
      dispatch (orderMaxFromMin(event.target.value))
    }
    if (event.target.value === "max-max"){
      dispatch (orderMaxFromMax(event.target.value))
    }
    if (event.target.value === "ave-min"){
      dispatch (orderAverageFromMin(event.target.value))
    }
    if (event.target.value === "ave-max"){
      dispatch (orderAverageFromMax(event.target.value))
    }
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }


  const handleFilterByOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleFilterByTemper= (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }



  // I have to fill my dogs state with the info form my Back. I use the action I created to do this

  useEffect(()=> {
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, []);







  //All the logic done, I return what I want to be rendered
  //Orders: by name (OK), by weight (DONE, BUT NOT WORKING!)
  //Filter by DB (DONE, BUT NOT WORKING!)
  //Filter by temperament-PENDING
  //Pagination numbers-OK
  //Dogs card as individual units-OK

  return (
    <div>

      <div>Alphabetical Ordering</div>
      <select onChange={event =>{handleOrder1(event)}}>
        <option value="a-z">from A to Z</option>
        <option value="z-a">from Z to A</option>
      </select>
      <div>Weight Ordering</div>
      <div>Min weight</div>
      <select onChange={event =>{handleOrder2(event)}}>
        <option value="min-min">from lighter to heavier</option>
        <option value="min-max">from heavier to lighter</option>
      </select>
      <div>Max weight</div>
      <select onChange={event =>{handleOrder2(event)}}>
        <option value="max-min">from lighter to heavier</option>
        <option value="max-max">from heavier to lighter</option>
      </select>
      <div>Average weight</div>
      <select onChange={event =>{handleOrder2(event)}}>
        <option value="ave-min">from lighter to heavier</option>
        <option value="ave-max">from heavier to lighter</option>
      </select>

      <div>Filter dogs' sourcing</div>
      <select onChange={event => {handleFilterByOrigin(event)}}>
        <option value="All">All dogs</option>
        <option value="api">Api dogs</option>
        <option value="from_DB">My dogs</option>
      </select>

      <div>Filter dogs by temperament</div>
      <select value={temperament} onChange={event => {handleFilterByTemper(event)}}>
        <option value="all">All Temperaments</option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
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
          weight= {dog.weight}
          />
          )
        })
      }    
    </div>
  )
}

export default AllDogs
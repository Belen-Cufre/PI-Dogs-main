import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments} from "../../../redux/actions/index"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';
import style from "./allDogs.module.css";
import SearchBar from '../searchBar/Search';
import pepitoJuarez from "../allDogs/pepitoJuarez.png"


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

  const temperaments = useSelector(state => [...state.temperaments].sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }))

  // const temperaments = useSelector((state) => state.temperaments).sort(
  //   function (a, b) {
  //       if (a < b) return -1;
  //       else return 1;
  //   })


  const handleOrder1= (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2 = (event) =>{
    dispatch(orderByWeight(event.target.value))
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
  }, [dispatch]);


  //All the logic done, I return what I want to be rendered
  //Orders: by name (OK), by weight (DONE, BUT NOT WORKING!)
  //Filter by DB (DONE, BUT NOT WORKING!)
  //Filter by temperament-PENDING
  //Pagination numbers-OK
  //Dogs card as individual units-OK

  return (
    <div>
      <SearchBar setCurrentPage={setCurrentPage}/>

        <div className={style.filters}>

        
          <div className={style.filterByOrigin}>
            <div>Filter dogs' sourcing
              <select onChange={event => {handleFilterByOrigin  (event)}}>
                <option value="All">All dogs</option>
                <option value="api">Api dogs</option>
                <option value="from_DB">My dogs</option>
              </select>   
            </div>
        </div>

        <div className={style.filterByTemperament}>
          <div>Filter by temperament
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
            </div>
        </div> 

        <div className={style.orderByName}>
          <div>Alphabetical Ordering
            <select defaultValue="name" onChange={event =>{handleOrder1(event)}}>
              <option value="name" disabled selected></option>
              <option value="a-z">From A to Z</option>
              <option value="z-a">From Z to A</option>
            </select>
            </div>
        </div>

        <div className={style.orderByWeight}>
          <div>Weight Ordering
            <select defaultValue="weight" onChange={event =>{handleOrder2(event)}}>
              <option value="weight" disabled selected></option>
              <option value="min">From lighter to heavier</option>
              <option value="max">From heavier to lighter</option>
            </select>
            </div>
          <p>-</p>
        </div>

        <div className={style.orderByAverage}>
          <div>Average weight
            <br />
            <select defaultValue="aver" onChange={event =>{handleOrder2(event)}}>
              <option value="aver" disabled selected></option>
              <option value="ave">From lighter to heavier</option>
              <option value="ave-max">From heavier to lighter</option>
            </select>
          </div>
        </div>
      </div>


        <Pagination
        dogsPerPage= {dogsPerPage}
        dogs= {dogs.length}
        pagination= {pagination} />

      {currentDogs.length ? (<div className={style.container}>
      {
        currentDogs?.map(dog=> {
          return (
          <Dog
          id= {dog.id}
          key= {dog.id}
          image= {dog.image}
          name= {dog.name}
          temperament= {dog.temperament}
          weightMin= {dog.weightMin}
          weightMax= {dog.weightMax}
          averageWeight= {dog.averageWeight}
          />
          )
        })
      }
      </div>) : 
      (<div className={style.pepitoJuarez} >
          <h3>This dog does not exist. 😕</h3>
          <img src={pepitoJuarez}/>
          <h3>Would you like to create it? 😎</h3>
        </div>)}          
    </div>
  )
}

export default AllDogs
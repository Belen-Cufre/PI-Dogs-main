import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments, setCurrentPage} from "../../../redux/actions/index"
import Dog from "../dog/Dog"
import Pagination from '../pagination/Pagination';
import style from "./allDogs.module.css";
import SearchBar from '../searchBar/Search';
import pepitoJuarez from "../allDogs/pepitoJuarez.png"

//This function has the complete logic of /home path

const AllDogs = () => {

  //I create all the consts I need to use in this function

  const dispatch= useDispatch();
  const dogs= useSelector(state => state.dogs); //global state
  const currentPage= useSelector(state => state.currentPage);

  //local states
  const [order, setOrder]= useState('') 
  const [temperament, setTemperament]= useState('all')
  const [dogsPerPage, setDogsPerPage] = useState(8) //this number 8 is the amount of dogs I want to show per page
  const [filter, setFilter]= useState({
    origin: "All",
    temperament: "all",
    name: "name",
    weight: "weight",
    aver: "aver",
  })
  
  
  //Pagination  
  const numOfLastDog= currentPage * dogsPerPage;
  const numOfFirstDog= numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)
  
  const pagination= (page) => {
    dispatch(setCurrentPage(page))}
    
  
  //This is to show temps oredered
  const temperaments = useSelector(state => [...state.temperaments].sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }))


  //Sorts
  const handleOrder1= (event) => {
    dispatch(orderByName(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`)
    setFilter({...filter,
      name: event.target.value
    });
  }

  const handleOrder2 = (event) =>{
    dispatch(orderByWeight(event.target.value))
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({...filter,
      weight: event.target.value,
    });
  }

  const handleOrder3 = (event) =>{
    dispatch(orderByWeight(event.target.value))
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({...filter,
      aver: event.target.value,
    });
  }


  //Filters
  const handleFilterByOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value));
    dispatch(setCurrentPage(1));
    setFilter({...filter,
    origin: event.target.value})
  }

  const handleFilterByTemper= (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value));
    dispatch(setCurrentPage(1));
    setFilter({...filter,
      temperament: event.target.value})
  }

  //Reset filters
  const handleClick= (event)=> {
    event.preventDefault();
    dispatch(getAllBreeds());
    // setDog("");
    setFilter({
      origin: "All",
      temperament: "all",
      name: "name",
      weight: "weight",
      aver: "aver",
    })
  }  

  // I have to fill my dogs state with the info form my Back. I use the action I created to do this

  useEffect(()=> {
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, [dispatch]);


  //All the logic done, I return what I want to be rendered

  return (
    <div>
      <SearchBar />
      <div className={style.divGetAllB}>
        <button className={style.refButton} onClick={(event)=> handleClick(event)}>Get all dogs back</button>
      </div>

        <div className={style.filters}>

        
          <div className={style.filterByOrigin}>
            <div>Filter dogs' sourcing
              <select value = {filter.origin} onChange={event => {handleFilterByOrigin (event)}}>
                <option value="All">All dogs</option>
                <option value="api">Api dogs</option>
                <option value="from_DB">My dogs</option>
              </select>   
            </div>
        </div>

        <div className={style.filterByTemperament}>
          <div>Filter by temperament
            <select value={filter.temperament} onChange={event => {handleFilterByTemper(event)}}>
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
            <select value = {filter.name} onChange={event =>{handleOrder1(event)}}>
              <option value="name" disabled selected></option>
              <option value="a-z">From A to Z</option>
              <option value="z-a">From Z to A</option>
            </select>
            </div>
        </div>

        <div className={style.orderByWeight}>
          <div>Weigh Ordering
            <select value = {filter.weight} onChange={event =>{handleOrder2(event)}}>
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
            <select value = {filter.aver} onChange={event =>{handleOrder3(event)}}>
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

export default AllDogs;
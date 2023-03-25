import React from 'react'
import AllDogs from './allDogs/AllDogs';
// import SearchBar from './searchBar/Search';
import { getAllBreeds } from "../../redux/actions/index"
import { useState } from "react";
import { useDispatch } from 'react-redux';
import style from "./home.module.css"
import NavBar from "../navBar/NavBar"

const Home = () => {
  const [dog, setDog]= useState("");
  const dispatch= useDispatch();  
  const handleClick= (event)=> {
  event.preventDefault();
  dispatch(getAllBreeds());
  setDog("");
}    
  
  return (
    <div>
      <NavBar />
      <h1 className={style.title}>Dogs...Who can´t love them!</h1>
      <div className={style.divGetAllB}>
        <button className={style.refButton} onClick={(event)=> handleClick(event)}>Get all dogs back</button>
      </div>
      <AllDogs/>
    </div>
  )
}

export default Home;
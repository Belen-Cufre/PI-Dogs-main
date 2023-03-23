import React from 'react'
import AllDogs from './allDogs/AllDogs';
import SearchBar from './searchBar/Search';
import { getAllBreeds } from "../../redux/actions/index"
import { useState } from "react";
import { useDispatch } from 'react-redux';

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
      <h1>Dogs...Who can´t love them!</h1>
      <SearchBar />
      <button onClick={(event)=> handleClick(event)}>Get all dogs back</button>
      <AllDogs/>
    </div>
  )
}

export default Home;
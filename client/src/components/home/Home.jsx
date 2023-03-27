import React from 'react'
import AllDogs from './allDogs/AllDogs';
import style from "./home.module.css"
import NavBar from "../navBar/NavBar"

const Home = () => {
  
  return (
    <div>
      <NavBar />
      <h1 className={style.title}>Dogs...Who can´t love them!</h1>
      <AllDogs/>
    </div>
  )
}

export default Home;
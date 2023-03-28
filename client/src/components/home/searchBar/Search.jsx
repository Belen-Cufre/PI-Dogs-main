import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, setCurrentPage } from "../../../redux/actions/index"
import style from "./searchBar.module.css"

const SearchBar= ()=> {
const [dog, setDog]= useState("");

const dispatch= useDispatch();

const handleChange= (event)=> {
   dispatch(getName(event))
   dispatch(setCurrentPage(1))
}

const handleClick= (event)=>{
      setDog("")
}

   return (
      <div className={style.SearchContainer}>
            <input className={style.bar} type='text' value={dog} onChange={(event)=> {setDog(event.target.value); handleChange(event.target.value)}} placeholder='Search for a dog 🔎'/>
            <button className={style.search} type="submit" onClick={(event)=> handleClick(event)}>Search</button>
      </div>
   );
}

export default SearchBar;
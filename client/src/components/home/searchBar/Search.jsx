import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../../redux/actions/index"
import style from "./searchBar.module.css"

const SearchBar= ({setCurrentPage})=> {
const [dog, setDog]= useState("");

const dispatch= useDispatch();

const handleChange= (event)=> {
   dispatch(getName(event))
   setCurrentPage(1)
}

   return (
      <div className={style.SearchContainer}>
            <input className={style.bar} type='text' value={dog} onChange={(event)=> {setDog(event.target.value); handleChange(event.target.value)}} placeholder='Search for a dog 🔎'/>
            <button className={style.search} type="submit">Search</button>
      </div>
   );
}

export default SearchBar;
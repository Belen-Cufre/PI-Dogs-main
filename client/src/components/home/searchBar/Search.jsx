import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../../redux/actions/index"

const SearchBar= ()=> {
const [dog, setDog]= useState("");
const dispatch= useDispatch();

const handleChange= (event)=> {
    event.preventDefault();
    setDog(event.target.value)
}

const handleSearch= (event) =>{
    event.preventDefault();
    if (dog.length === 0) {
      return alert("Please, chose a name");
    } else {
      dispatch(getDogsByName(dog));
      setDog("");
    }
  }

   return (
      <div>
         <input type='search' value={dog} onChange={handleChange} placeholder='Search for a dog'/>
        <button type="submit" onClick={(event)=> handleSearch (event)}>Search</button>
      </div>
   );
}

export default SearchBar;
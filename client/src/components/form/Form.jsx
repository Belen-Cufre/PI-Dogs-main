import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDog, getAllTemperaments } from "../../redux/actions";
import validate from "./validate"


const Form = () => {

  const dispatch = useDispatch();
  const temperaments= useSelector((state)=> state.temperaments) //global state

  const [inputs, setInputs]= useState({ //local state
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "",
			weightMax: "",
      temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event)=> {
    setInputs({
      ...inputs,
      [event.target.name] : event.target.value
    })
    setErrors(validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleTemperamentChoices = (event)=> {
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, event.target.value]
    })
  }

  const handleDelete= (temp)=> {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter( inst => inst !== temp)
    })
  }

  const handleSubmit= (event)=> {
    event.preventDefault();
    dispatch(createDog(inputs))
    alert ("Dog successfully added")
    setInputs({
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "",
			weightMax: "",
      temperaments: [],
    })
  }
  
  useEffect(()=> {
    dispatch(getAllTemperaments())
  }, []);

  return(
    <div>
      <h1>Complete the dog´s list</h1>
      <h2>A real dog API can´t have our dogs missing ❤</h2>
      <h3>Let´s add our dogs to complete this API</h3>

      <form>
        <div>
          <label>Name: </label>
          <input 
          type="text" 
          name="name"
          value={inputs.name}
          onChange={(event)=>handleInputs(event)}/>
          {error.name && <strong>{error.name}</strong>}
        </div>

        <div>
          <label>Image: </label>
          <input 
          type="text" 
          name="image"
          value={inputs.image}
          onChange={(event)=>handleInputs(event)}/>
          {error.image && <strong>{error.image}</strong>}
        </div>

        <div>
          <h5>Weight</h5>
          <label>Min: </label>
          <input 
          type="number" 
          name="weightMin"
          value={inputs.weightMin}
          min= "1"
          max= "100"
          onChange={(event)=>handleInputs(event)}/>
          {error.weightMin && <strong>{error.weightMin}</strong>}

          <label>Max: </label>
          <input 
          type="number" 
          name="weightMax"
          value={inputs.weightMax}
          min= "1"
          max= "100"
          onChange={(event)=>handleInputs(event)}/>
          {error.weightMax && <strong>{error.weightMax}</strong>}
        </div>

        <div>
          <label>Height: </label>
          <input 
          type="text" 
          name="height"
          value={inputs.height}
          onChange={(event)=>handleInputs(event)}/>
          {error.height && <strong>{error.height}</strong>}
        </div>

        <div>
          <label>Life expectancy: </label>
          <input 
          type="number" 
          name="life_span"
          value={inputs.life_span}
          onChange={(event)=>handleInputs(event)}/>
          {error.life_span && <strong>{error.life_span}</strong>}
        </div>

        <h5>Temperaments:</h5>
        <select value={temperaments} onChange={(event)=>handleTemperamentChoices(event)}>
          <option value="all"></option>
          {temperaments.map((temp)=> {
            return(
              <option value={temp} key={temp}>
                {temp}
              </option>
            );
          })}
        </select>
        <h5>My dog is...</h5>
        <ul><li>{inputs.temperaments.map(temp => temp + " ,")}</li></ul>

        <button type="submit" onClick={(event)=>handleSubmit(event)}>Add my dog</button>
        
      </form>
      {inputs.temperaments.map(temp =>
        <div>
          <p>{temp}</p>
          <button onClick={()=>{handleDelete(temp)}}>X</button>
        </div>
        )}

    </div>
  )
}

export default Form;



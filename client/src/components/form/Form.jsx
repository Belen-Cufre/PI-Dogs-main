import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewDog, getAllTemperaments } from "../../redux/actions";
import validate from "./validate"
import style from "./form.module.css"
import NavBar from "../navBar/NavBar"

const Form = () => {

  const dispatch = useDispatch();
  const temperaments= useSelector((state)=> state.temperaments) //global state

  const [inputs, setInputs]= useState({ //local state
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
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
    let { value }= event.target;
    if (inputs.temperaments.includes(value)) {
      return alert ("Temperaments can not be repeated")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
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
    dispatch(createNewDog(inputs))
    console.log(inputs)
    alert ("Dog successfully added")
    setInputs({
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
    })
  }
  
  useEffect(()=> {
    dispatch(getAllTemperaments())
  }, []);

  return(
    <div>
      <NavBar />
      <h1 id={style.title}>Complete the dog´s list</h1>
      <h2 className={style.title2}>A real dog API can´t have our dogs missing ❤</h2>
      <h3 className={style.title3}>Let´s add our dogs to complete this API</h3>

      <form className={style.Formulario}>
        <div className={style.inputs}>
          <div>
            <label>Name: </label>
            <input 
            type="text" 
            name="name"
            value={inputs.name}
            placeholder={"For example: Boby Alvarez"}
            onChange={(event)=>handleInputs(event)}/>
            {error.name && <strong>{error.name}</strong>}
          </div>

          <br />

          <div>
            <label>Image: </label>
            <input 
            type="text" 
            name="image"
            value={inputs.image}
            placeholder= {"For example: https://mydog.jpg "}
            onChange={(event)=>handleInputs(event)}/>
            {error.image && <strong>{error.image}</strong>}
          </div>

          <br />

          <div>
            <label>Weight</label>
            <br />
            <br />
            <label>Min (kg): </label> 
            <input 
            type="text" 
            name="weightMin"
            value={inputs.weightMin}
            // min= "1"
            // max= "100"
            onChange={(event)=>handleInputs(event)}/>
            {error.weightMin && <strong>{error.weightMin}</strong>}

            <br />

            <label>Max (kg): </label>
            <input 
            type="text" 
            name="weightMax"
            value={inputs.weightMax}
            // min= "1"
            // max= "100"
            onChange={(event)=>handleInputs(event)}/>
            {error.weightMax && <strong>{error.weightMax}</strong>}

          </div>

          <br />

          <div>
            <label>Height (cm): 
              <input 
              type="text" 
              name="height"
              value={inputs.height}
              placeholder= {"For example: 55 - 67 centimeters"}
              onChange={(event)=>handleInputs(event)}/>
              {error.height && <strong>{error.height}</strong>}
            </label>
          </div>

          <br />

          <div>
            <label>Life expectancy: 
              <input 
              type="text" 
              name="life_span"
              value={inputs.life_span}
              placeholder={"For example: 10 - 15 years"}
              onChange={(event)=>handleInputs(event)}/>
              {error.life_span && <strong>{error.life_span}</strong>}
            </label>
          </div>

          <br />

          <label>Temperaments: </label>
            <div className={style.temperaments}>
              <select value={temperaments} onChange={(event)=>handleTemperamentChoices(event)}>
              <option className={style.opciones} value="all"></option>
              {temperaments.map((temp)=> {
                return(
                <option className={style.opciones} value={temp} key={temp}>
                  {temp}
                </option>
                );
              })}
              </select>
            <h4>My dog is...</h4>
            <ul className={style.lista}><div>{inputs.temperaments.map(temp => temp + ", ")}</div></ul>
            <button 
            type="submit"
            onClick={(event)=>handleSubmit(event)}
            // disabled= {
            //   error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
            // }  
            className={style.button} disabled= {
              error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
            }
            >Add my dog</button>
          </div>
        </div>
      </form>

      {inputs.temperaments.map(temp =>
        <div>
          <div className={style.toDelete}>
            <h4>{temp} </h4>
          </div>
          <div className={style.deleteBut}>
            <button
            onClick={()=>{handleDelete(temp)}}>X</button>
          </div>
        </div>
        )}


    </div>
  )
}

export default Form;



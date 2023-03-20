import axios from "axios";
import { FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_MINFROMMAX, ORDER_MINFROMMIN, ORDER_MAXFROMMIN, ORDER_MAXFROMMAX, ORDER_AVEFROMMIN, ORDER_AVEFROMMAX, GET_ALL_TEMPS, FILTER_BY_TEMPER,
GET_DOGS_BY_NAME } from "../action_types/action_types";

export const getAllBreeds = ()=> {
    return async function(dispatch){
        const info= await axios("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: info.data
        })
    }
}

export const getAllTemperaments = () => {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperaments');
        let listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: GET_ALL_TEMPS,
            payload: listOfTemperaments
        });
    }
}

export const orderByName= (payload)=> {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderMinFromMin= (payload)=> {
    return {
        type: ORDER_MINFROMMIN,
        payload
    }
}

export const orderMinFromMax= (payload)=> {
    return {
        type: ORDER_MINFROMMAX,
        payload 
    }
}

export const orderMaxFromMin= (payload)=> {
    return {
        type: ORDER_MAXFROMMIN,
        payload 
    }
}

export const orderMaxFromMax= (payload)=> {
    return {
        type: ORDER_MAXFROMMAX,
        payload 
    }
}

export const orderAverageFromMin= (payload)=> {
    return {
        type: ORDER_AVEFROMMIN,
        payload 
    }
}

export const orderAverageFromMax= (payload)=> {
    return {
        type: ORDER_AVEFROMMAX,
        payload 
    }
}

export const filterByOrigin= (payload)=> {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export const filterByTemper= (payload)=> {
    return {
        type: FILTER_BY_TEMPER,
        payload
    }
}

export const getDogsByName= (name)=> {
    return async function (dispatch){
        try {
          let json = await axios (`http://localhost:3001/dogs?name=${name}`)
          return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: json.data
          })
        } catch (error) {
          console.log(error)
        }
    }
}
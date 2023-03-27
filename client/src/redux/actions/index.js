import axios from "axios";
import { FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_ALL_TEMPS, FILTER_BY_TEMPER,
GET_DOGS_BY_NAME, GET_DOG_DETAIL, CREATE_DOG, RESET_DETAIL, GET_NAME, SET_CURRENT_PAGE } from "../action_types/action_types";

//These functions are called by my components according to the requested info

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

export const orderByWeight= (payload)=> {
    return {
        type: ORDER_BY_WEIGHT,
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

export const getName= (name)=> {
    return {
        type: GET_NAME,
        payload: name
    }
}


export const getDogDetail= (id)=> {
    return async function(dispatch){
        let json = await axios (`http://localhost:3001/dogs/${id}`)

        return dispatch({
            type: GET_DOG_DETAIL,
            payload: json.data
            })
    }
}

export const createNewDog= (payload)=> {
    return async function(dispatch){
        let newDog= await axios.post("http://localhost:3001/dogs", payload);
        return newDog
    }
}

export const resetDetail= ()=> {
    return {
        type: RESET_DETAIL
    }
}

export const setCurrentPage= (payload)=> {
    return {
        type: SET_CURRENT_PAGE,
        payload
    }
}

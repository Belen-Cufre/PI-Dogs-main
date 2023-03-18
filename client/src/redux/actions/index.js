import axios from "axios";
import { FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../action_types/action_types";

export const getAllBreeds = ()=> {
    return async function(dispatch){
        const info= await axios("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: info.data
        })
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
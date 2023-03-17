import axios from "axios";
import { GET_ALL_BREEDS } from "../action_types/action_types";

export const getAllBreeds = ()=> {
    return async function(dispatch){
        const info= await axios("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: info.data
        })
    }
} 
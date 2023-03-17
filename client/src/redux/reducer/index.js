import { GET_ALL_BREEDS } from "../action_types/action_types";

//here I create my reducer which will handle my global state

const initialState = {
    dogs: [],
    dogDetail: {},
    temperaments: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                dogs: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer;
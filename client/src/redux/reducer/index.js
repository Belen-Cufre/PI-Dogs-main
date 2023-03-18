import { FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../action_types/action_types";

//here I create my reducer which will handle my global state

const initialState = {
    dogs: [],
    dogDetail: {},
    temperaments: [],
    allDogs: [],
}

const handleOrder2= (symbol)=> {
    let justWeight= initialState.dogs.map(inst=> inst.weight.metric)
    let averageWeight= justWeight.map(inst => inst.split(" - ")).map(inst=> (Number(inst[0]) + Number(inst[1]) / 2));
    if (symbol === "-"){
    let lighterToHeavier= averageWeight.sort();
    return lighterToHeavier;
    }
    if (symbol === "+"){
    let heavierToLighter= averageWeight.reverse();
    return heavierToLighter;}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case ORDER_BY_NAME:
            let ordered= action.payload === "a-z" ? state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: ordered
            }

        case ORDER_BY_WEIGHT:
            let ordered2= action.payload === "-" ? handleOrder2("-") : handleOrder2 ("+")
            return {
                ...state,
                dogs: ordered2
            }
  
              

        case FILTER_BY_ORIGIN:
            // const allDogs = state.allDogs;
            const filteredOrigin= action.payload === "from_DB" ? state.allDogs.filter( inst => inst.from_DB) : state.allDogs.filter(inst=> !inst.from_DB);
            return {
                ...state,
                dogs: action.payload === "All" ? state.allDogs : filteredOrigin
            }

        default:
            return {...state}
    }
}

export default reducer;
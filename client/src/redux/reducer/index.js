import { FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_MINFROMMIN, ORDER_MINFROMMAX,
ORDER_MAXFROMMIN, ORDER_MAXFROMMAX, ORDER_AVEFROMMIN, ORDER_AVEFROMMAX, FILTER_BY_TEMPER, GET_ALL_TEMPS, GET_DOGS_BY_NAME} from "../action_types/action_types";

//here I create my reducer which will handle my global state

const initialState = {
    dogs: [], //this would be like a current
    dogDetail: {},
    temperaments: [],
    allDogs: [], //this is a copy of all dogs which endures
}

const reducer = (state = initialState, action) => {

    let weights= state.dogs.map(dogui => {
        return dogui.weight.split(" - ") // weight: ["2" "4"]
        .map((inst)=> parseInt(inst)) //weight: [2, 4]
   });

    let averWeight= state.dogs.map(dogui => {
        return dogui.weight.split(" - ") // weight: ["2" "4"]
        .map((inst)=>(parseInt(inst[0]) + parseInt(inst[1])) /2)
    });
    
    switch(action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case GET_ALL_TEMPS:
            return {
                ...state,
                temperaments: action.payload,
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

        case ORDER_MINFROMMIN:

            if(action.payload === "min-min") {
                let ordered1= weights.sort((dogA, dogB) => {
                if (dogA.weight[0] > dogB.weight[0])
                return 1;
                if (dogB.weight[0] > dogA.weight[0])
                return -1;
                return 0
            })
            return {
                ...state,
                dogs: ordered1
            }
        }

        case ORDER_MINFROMMAX:
            if(action.payload === "min-max") {
                let ordered2= weights.sort((dogA, dogB) => {
                if (dogA.weight[0] > dogB.weight[0])
                return -1;
                if (dogB.weight[0] > dogA.weight[0])
                return 1;
                return 0
            })
            return {
                ...state,
                dogs: ordered2
            }
        }
        
        case ORDER_MAXFROMMIN:
            if(action.payload === "max-min") {
                let ordered3= weights.sort((dogA, dogB) => {
                if (dogA.weight[1] > dogB.weight[1])
                return 1;
                if (dogB.weight[1] > dogA.weight[1])
                return -1;
                return 0
            })
            return {
                ...state,
                dogs: ordered3
            }
        }

        case ORDER_MAXFROMMAX:
            if(action.payload === "max-max") {
                let ordered4= weights.sort((dogA, dogB) => {
                if (dogA.weight[1] > dogB.weight[1])
                return -1;
                if (dogB.weight[1] > dogA.weight[1])
                return 1;
                return 0
            })
            return {
                ...state,
                dogs: ordered4
            }
        }

        case ORDER_AVEFROMMIN:
            if(action.payload === "ave-min") {
                let ordered5= averWeight.sort()
            return {
                ...state,
                dogs: ordered5
            }
        }

        case ORDER_AVEFROMMAX:
            if(action.payload === "ave-max") {
                let ordered6= averWeight.reverse()
            return {
                ...state,
                dogs: ordered6
            }
        }

        case FILTER_BY_ORIGIN:
            // const allDogs = state.allDogs;
            const filteredOrigin= action.payload === "from_DB" ? state.allDogs.filter( inst => inst.from_DB) : state.allDogs.filter(inst=> !inst.from_DB);
            return {
                ...state,
                dogs: action.payload === "All" ? state.allDogs : filteredOrigin
        }

        case FILTER_BY_TEMPER:
            let dogsWithChosenTemps= action.payload  === "all" ? state.allDogs :
            state.allDogs?.filter(dog=> {
                if(!dog.temperament) return undefined;
                return dog.temperament.split(", ").includes(action.payload)
            })
            return {
                ...state,
                dogs: dogsWithChosenTemps
            }
        
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }

            
        default:
            return {...state}
    }
}

export default reducer;
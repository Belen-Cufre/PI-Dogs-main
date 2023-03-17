import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/index";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //This line is just to connect the browser extension redux devtools. Remember to install this

//Here I create my global state store
const store= createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //this is my translator
);

export default store;

const { Router } =  require ("express");

//I create the "temperaments" router, which has all the req and res handlers and all the answers which are targeted to /temperaments route.
//For that, I import the handler which handles the temperaments

const {getAllTempHandlers} = require("../handlers/tempHandlers")

//temp router

const tempRouter= Router();

tempRouter.get("/", getAllTempHandlers);//this handler has to get all temperaments from the Api into my DB.

module.exports = tempRouter;
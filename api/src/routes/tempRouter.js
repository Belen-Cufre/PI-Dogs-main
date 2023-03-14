//I create the "temperaments" router, whicha has all the req and res handlers and all the answers which are targeted to /temperaments route.

const { Router } =  require ("express");

const getAllTempHandlers = require("../handlers/tempHandlers")

//una vez construidos, requerir los handlers!

const tempRouter= Router();

tempRouter.get("/", getAllTempHandlers);


module.exports = tempRouter;
const { Router } =  require ("express");

//I create the dogs router, which will call all the handlers with req and res which use the dogs routes. For that, I have to require all the handlers which handle the dogs

const { getBreedsHandler, getRazaByIdHandler, createNewDogHandler} = require ("../handlers/dogsHandler")

//dog router

const dogsRouter = Router();

dogsRouter.get("/", getBreedsHandler);//this handler has to get all breeds. It can receive a query name. In this case, brings just the names. It brings data from an Api and from the DB
dogsRouter.get("/:idRaza", getRazaByIdHandler); //this handler has to get a breed by id. It can receiveS a param. It can bring data from an Api or from the DB
dogsRouter.post("/", createNewDogHandler);//this handler has to create a new dog or breed. It has to receive information from the body. It stores the new dogs on the DB

module.exports = dogsRouter;
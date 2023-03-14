//Armo el enrutador de "dogs", el que tendrá todos los manejadores de requerimientos y respuestas que vayan hacia la ruta /dogs

const { Router } =  require ("express");

//requiero los handlers de perros

const { getBreedsHandler, getRazaByIdHandler, createNewDogHandler} = require ("../handlers/dogsHandler")


const dogsRouter = Router();

dogsRouter.get("/", getBreedsHandler);
dogsRouter.get("/:idRaza", getRazaByIdHandler);
dogsRouter.post("/", createNewDogHandler);

module.exports = dogsRouter;
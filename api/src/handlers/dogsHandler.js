//these handlers have to do the get and posts of my dogs.
//for that, they need to have internal logics which I created in another folder of controllers. I import the controllers which control the logics of these handlers

const { getBreeds, getBreedsByName, getBreedById, createNewDog }= require("../controllers/dogsController")

//this handler has to get all breeds. It can receive a query name. In this case, brings just the names. It brings data from an Api and from the DB
const getBreedsHandler= async (req, res)=> {
    const {name} = req.query;
    try {
        if(name){
            let result= await getBreedsByName(name);
            return res.status(200).json(result)
        }
        else{
            let result= await getBreeds();
            return res.status(200).json(result)
        }         
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

//this handler has to get a breed by id. It can receiveS a param. It can bring data from an Api or from the DB
const getRazaByIdHandler= async (req, res)=> {
    const {idRaza} = req.params
    let origin= isNaN(idRaza) ? "db" : "api";
    
    try {
        let result= await getBreedById(idRaza, origin);

        if(result.error) throw new Error(result.error);

        res.status(200).json(result)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

//this handler has to create a new dog or breed. It has to receive information from the body. It stores the new dogs on the DB

const createNewDogHandler= async (req, res)=> {
    let { weightMin, weightMax, height, name, life_span, image, temperaments, from_DB }= req.body;
    try {
        await createNewDog(weightMin, weightMax, height, name, life_span, image, temperaments)
        res.status(200).send("New dog successfully created")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports= {
    getBreedsHandler,
    getRazaByIdHandler,
    createNewDogHandler
}
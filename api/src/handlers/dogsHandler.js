
const { getBreeds, getBreedsByName, getBreedById, createNewDog }= require("../controllers/dogsController")

//I bring all my controllers and create the dog hanlders

//This function allows me to get all breeds from dogs and ti get the breeds of those dogs which names had been sent by query

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const getBreedsHandler= async (req, res)=> {
    const {name} = req.query;
    try {
        if(!name){
            let result= await getBreeds();
            return res.status(200).json(result)
        }
        else{
            let result= await getBreedsByName(name);
            return res.status(200).json(result)
        }         
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

const getRazaByIdHandler= async (req, res)=> {
    const {idRaza} = req.params
    try {
        let result= await getBreedById(idRaza);
        return res.status(200).json(result)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

const createNewDogHandler= async (req, res)=> {
    let { weight, height, name, life_span, image, temperament, from_DB }= req.body;
    try {
        await createNewDog(weight, height, name, life_span, image, temperament)
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
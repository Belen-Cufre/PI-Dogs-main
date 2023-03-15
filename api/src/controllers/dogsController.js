const axios = require ("axios");
const Dog= require ("../db");
const Temperament= require ("../db");

const getBreeds= async()=> {
    let breeds= []
    let fromApi= await axios(`https://api.thedogapi.com/v1/breeds?api_key={API_KEY}`).data.map((inst)=>{
        return {
        id: inst.id,
        weight: inst.weight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image.url
        }
    });

    let fromDb= await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    });

    breeds= [...fromApi, ...fromDb]
    return breeds;
};

const getBreedsByName= async (name)=>{
    
    let name2= name.toLowercase();
    let breeds = await getBreeds();
    let result= breeds.filter((inst)=> {
        if(inst.toLowercase().includes(name2)) {
            result.push(inst);
            return result;
        }
        else {
            throw new Error("This breed does not exist")
        }
    })
};

const getBreedById= async (id)=> {
    if(isNaN(id)){
        let result= await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key={API_KEY}`).data
        return result
    }
    else {
        let result= await Dog.findByPk(id)
        return result
    }
};

const createNewDog= async (weight, height, name, life_span, image)=> {
    if (!weight || !height || !name || !life_span || !image){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            weight,
            height,
            name,
            life_span,
            image,
        })
        return newDog;
    }
};

module.exports= {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}
require('dotenv').config();
const axios = require ("axios");
const {Dog}= require ("../db");
const {Temperament}= require ("../db");
const {API_KEY} = process.env

const getBreedsFromApi= async()=> {
    let apiData= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let fromApi= await apiData.data.map((inst)=>{
        return {
        id: inst.id,
        weight: inst.weight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image.url,
        temperament: inst.temperament
        }
    });
    return fromApi;
}

const getBreedsFromDb= async()=> {
    let dbData= await Dog.findAll({
    include: {
        model: Temperament,
        attributes: ["name"],
        through:{attributes: [],},
       },
    });

    let prueba= dbData.map(x=> x)
    console.log(prueba)
    let fromDb= dbData.map((inst)=>{
        return {
        id: inst.id,
        weight: inst.weight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image,
        temperament: inst.temperament?inst.temperament.map(el=> el.name).join(", "):[]
        }
    });
    return fromDb;
};

const getBreeds= async() => {
    let breedsApi= await getBreedsFromApi();
    let breedsDb= await getBreedsFromDb();
    let breeds= breedsApi.concat(breedsDb);
    return breeds;
}


// const getBreeds= async()=> {
//     let breeds= []
//     let fromApi= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     console.log(fromApi.data)
//     fromApi.data.map((inst)=>{
//         return {
//         id: inst.id,
//         weight: inst.weight,
//         height: inst.height,
//         name: inst.name,
//         life_span: inst.life_span,
//         image: inst.image.url
//         }
//     });

//     let fromDb= await Dog.findAll({
//         include: {
//             model: Temperament,
//             attributes: ["name"],
//             through:{
//                 attributes: [],
//             },
//         },
//     });

//     breeds= [...fromApi.data, ...fromDb]
//     return breeds;
// };

const getBreedsByName= async (name)=>{
    
    let name2= name.toLowerCase();
    let breeds = await getBreeds();
    if (name2) {
    let result = breeds.filter((inst)=> inst.name.toLowerCase().includes(name2));   
    if(result.length){
        return result
        }
    }
    else {
        throw new Error("This breed does not exist")
    }
};

const getBreedById= async (id)=> {
    console.log(id)
    console.log(isNaN(id))
    if(!isNaN(id)){
        let result= await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)
        console.log(result)
        if(!Object.keys(result.data).length){
            throw new Error (`The Dog with id ${id} does not exist`)
        }
        return result.data
    }
    else {
        let result= await Dog.findByPk(id)
        if(!Object.keys(result).length){
            throw new Error (`The Dog with id ${id} does not exist`)
        }
        return result
    }
};

const createNewDog= async (weight, height, name, life_span, image, temperament)=> {
    if (!weight || !height || !name || !life_span || !image || !temperament){
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
        let temper= await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
};

module.exports= {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}
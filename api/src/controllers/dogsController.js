//In this file, I created all the controllers I will use on my dog handlers.
//It is a file which will control the logics on my dogs route.

require('dotenv').config();
const axios = require ("axios");
const {Dog}= require ("../db");
const {Temperament}= require ("../db");
const {API_KEY} = process.env

//This function will bring all the info (.data) from the Api which I need to have. Same info criteria I used to create dogs

const getBreedsFromApi= async()=> {
    let apiData= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
        let fromApi= await apiData.data.map((inst)=>{
            let weightMin = parseInt(inst.weight.metric.slice(0, 2).trim()); 
            let weightMax = parseInt(inst.weight.metric.slice(4).trim());
            let averageWeight = weightMax + weightMin
        
            if (weightMin && weightMax) {
                averageWeight= averageWeight / 2;

            } else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight= averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;

            } else {
                if (inst.name === "Smooth Fox Terrier") {
                    weightMin = 6;
                    weightMax = 9;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                } else {
                    weightMin = 20;
                    weightMax = 30;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                }
            }
            // console.log(inst.weight.metric.length<=3&&inst.id)

        return {
        id: inst.id,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: averageWeight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image.url,
        temperament: inst.temperament
        }
    });
    return fromApi;
}

//This function will bring all all de data from the Db;

const getBreedsFromDb= async()=> {
    let dbData= await Dog.findAll({
    include: {
        model: Temperament,
        attributes: ["name"],
        through:{attributes: [],},
       },
    });

    let fromDb= dbData.map((inst)=>{
        return {
        id: inst.id,
        weightMax: inst.weightMax,
        weightMin: inst.weightMin,
        averageWeight: inst.averageWeight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image,
        temperament: inst.temperament?inst.temperament.map(el=> el.name).join(", "):["Happy"],
        from_DB: true,
        }
    });
    return fromDb;
};

//Unify in one function what comes from the api and what comes from db

const getBreeds= async() => {
    let breedsApi= await getBreedsFromApi();
    let breedsDb= await getBreedsFromDb();
    let breeds= breedsApi.concat(breedsDb);
    return breeds;
}

//This function will bring only the info related with the requested name. If the name does not exist, it will throw an error

const getBreedsByName= async (name)=>{
    
    let name2= name.toLowerCase();
    let breeds = await getBreeds();
    let result= breeds.filter((inst)=> inst.name.toLowerCase().includes(name2));
        
    if(result.length){
        return result
    }
    else {
        throw new Error("This breed does not exist")
    }
};

//This function will bring only the info belonging to the requested id. If the id does not exist, it will throw an error

const getBreedById = async (id, origin) => {
	try {
		if (origin === 'db') {
			let dogDB = await Dog.findOne({
				where: {
					id: id,
				},
				include: {
					model: Temperament,
					attributes: ['name'],
					through: { attributes: [] },
				},
			});

			if (dogDB) {
				return {
					id: inst.id,
					weightMax: inst.weightMax,
					weightMin: inst.weightMin,
                    averageWeight: inst.averageWeight,
					height: inst.height,
					name: inst.name,
					life_span: inst.life_span,
					image: inst.image,
					temperament: inst.temperament
						? inst.temperament.map((el) => el.name).join(', ')
						: ['Happy'],
					from_DB: true,
				};
			}
		} else {

			let result = await axios(
				`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
			);

            let perrito = result.data.find(el=> el.id === Number(id) );

				let weightMin = parseInt(perrito.weight.metric.slice(0, 2).trim());

				let weightMax = parseInt(perrito.weight.metric.slice(4).trim());

				let averageWeight = weightMax + weightMin;

				if (weightMin && weightMax) {
					averageWeight = averageWeight / 2;
				} else if (weightMin && !weightMax) {
					weightMax = weightMin;
					averageWeight = weightMin;
				} else if (!weightMin && weightMax) {
					weightMin = weightMax;
					averageWeight = weightMax;
				} else if (inst.name === 'Smooth Fox Terrier') {
					weightMin = 6;
					weightMax = 9;
					averageWeight = (weightMax + weightMin) / 2;
				} else {
					weightMin = 20;
					weightMax = 30;
					averageWeight = (weightMax + weightMin) / 2;
				}

				let dogDetail = {
					id: perrito.id,
					name: perrito.name,
					height: perrito.height.metric,
					life_span: perrito.life_span,
					image: perrito.image ? perrito.image.url : " ",
					temperament: perrito.temperament,
					weightMin: weightMin,
					weightMax: weightMax,
					averageWeight: averageWeight,
				};

				return dogDetail;
			}
		
	} catch (error) {
		return { error: `The dog with id ${id} does not exist` };
	}
};


//This function will create a new dog in my Db with all the requested info.

const createNewDog= async (weightMin, weightMax, height, name, life_span, image, temperament)=> {
    if (!weightMin || !weightMax || !height || !name || !life_span || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            id,
			name,
			height,
			life_span,
			image,
			temperament,
			weightMin,
			weightMax,
			averageWeight,
            from_DB,
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
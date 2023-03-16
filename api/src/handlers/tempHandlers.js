//this handler has to get all temperaments from the Api into my DB.
//for that, it needs to have an internal logic which I created in another folder of controllers. I import the controller which controls the logic of this handler
const {gettingAlltempsfromApi}= require ("../controllers/tempControllers")

//creating the handler
const getAllTempHandlers= async(req, res)=>{
try {
    let result= await gettingAlltempsfromApi()
    await res.status(200).json(result)
} catch (error) {
    res.status(404).send(error)
}
}

module.exports= {getAllTempHandlers};
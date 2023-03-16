const {gettingAlltempsfromApi}= require ("../controllers/tempControllers")

const getAllTempHandlers= async(req, res)=>{
try {
    let result= await gettingAlltempsfromApi()
    await res.status(200).json(result)
} catch (error) {
    res.status(404).send(error)
}
}

module.exports= {getAllTempHandlers};
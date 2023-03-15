const {gettingAlltempsfromApi}= require ("../controllers/tempControllers")

const getAllTempHandlers= async(req, res)=>{
try {
    // let result= await gettingAlltempsfromApi()
    await res.status(200).json(gettingAlltempsfromApi())
} catch (error) {
    res.status(404).send("Impossible to get the requested info")
}
}

module.exports= {getAllTempHandlers};
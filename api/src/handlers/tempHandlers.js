const {gettingAlltempsfromApi}= require ("../controllers/tempControllers")

const getAllTempHandlers= async(req, res)=>{
try {
    res.status(200).json(gettingAlltempsfromApi())
} catch (error) {
    res.status(500).send("Impossible to connect with API")
}
}

module.exports= {getAllTempHandlers};
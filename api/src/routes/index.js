const { Router } = require('express');
const dogsRouter = require("./dogsRouter");
const tempRouter = require("./tempRouter");

//I decided to create a main router so as to have all in separted files

const router = Router(); //main router

router.use('/dogs', dogsRouter); //all links which go to dogs, go in this router
router.use('/temperaments', tempRouter); //all links which go to temperaments, go in this router


module.exports = router;

const express = require('express');
const cors = require('cors');
const router = express.Router();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
const Genere = require("../models/genere")(sequelize);
router.get('/',async (req,res)=>{
    try{
        const genere = await Genere.findAll();
        if(genere){
            res.status(200).json(genere);
        }
        else{
            res.status(404).json({error:"Sorry no generes available"});
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
module.exports = router;
const express = require('express');
const cors = require('cors');
const router = express.Router();
const {sequelize} = require("../models/sequelize");
const Genere = require("../models/genere")(sequelize);
router.get('/',async (req,res)=>{
    try{
        const genere = await Genere.findAll();
            res.status(200).json(genere);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
router.get('/:id',async(req,res)=>{
    try{
        const genere = await Genere.findByPk(req.params.id);
        if(genere){
            res.status(200).json(genere);
        }
        else{
            res.status(404).json({error:"couldnt find the Genere"});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
router.post('/',async (req,res)=>{
    try{
        const genere = await Genere.create(req.body);
        res.status(201).json(genere);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

module.exports = router;
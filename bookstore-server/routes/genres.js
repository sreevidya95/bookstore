const express = require('express');
const CustomeError = require('../CustomError');
const cors = require('cors');
const router = express.Router();
const {sequelize} = require("../models/sequelize");
const Genere = require("../models/genere")(sequelize);
router.get('/',async (req,res,next)=>{
    try{
        const genere = await Genere.findAll();
            res.status(200).json(genere);
    }
    catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
    
});
router.get('/:id',async(req,res,next)=>{
    try{
        const genere = await Genere.findByPk(req.params.id);
        if(genere){
            res.status(200).json(genere);
        }
        else{
            const e = new CustomeError("couldnt find the genere",404)
             next(e);
        }
    }catch(error){
        const e = new CustomeError(error.message,500)
        next(e);
    }
});
router.post('/',async (req,res,next)=>{
    try{
        const checkGenere = await Genere.findAll({
            where:{
                genre_name:req.body.genre_name
            }
        });
        if(checkGenere.length>0){
            const e = new CustomeError("Genere Already Exists",403)
            next(e);
        }
        else{
            const genere = await Genere.create(req.body);
            res.status(201).json(genere);
        }
    }
    catch(error){
        const e = new CustomeError(error.message,500)
        next(e);
    }
});

module.exports = router;
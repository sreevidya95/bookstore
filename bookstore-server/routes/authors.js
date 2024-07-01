const express = require('express');
const router = express.Router();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
const Author = require('../models/author')(sequelize);
router.get('/',async (req,res)=>{
    try{
        const authors = await Author.findAll();
            res.status(200).json(authors);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
module.exports = router;
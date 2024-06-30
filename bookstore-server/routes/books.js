const express = require('express');
const router = express.Router();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
const Book = require("../models/book")(sequelize);
router.get('/',async (req,res)=>{
    try{
        const books = await Book.findAll();
        if(books){
            res.status(200).json(books);
        }
        else{
            res.status(404).json({error:"Sorry no books available"});
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
module.exports = router;
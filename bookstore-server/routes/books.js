const express = require('express');
const router = express.Router();
const {Sequelize, where} = require('sequelize');
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
const Book = require("../models/book")(sequelize);
router.get('/',async (req,res)=>{
    try{
        const books = await Book.findAll();
            res.status(200).json(books);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
router.get('/:id',async(req,res)=>{
    try{
        const book = await Book.findByPk(req.params.id);
        if(book){
            res.status(200).json(book);
        }
        else{
            res.status(404).json({error:"couldnt find the book"});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
router.post('/',async (req,res)=>{
    try{
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
router.put('/:id',async (req,res)=>{
    try{
        const updated = await Book.update(req.body,{
            where:{
                book_id:req.params.id
            }
        })
        if(updated){
            let book =await Book.findByPk(req.params.id);
            res.status(200).json(book);

        }
        else{
            res.status(404).json({error:"Couldn't find the book"})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
    
});
router.delete('/:id',async (req,res)=>{
    try{
        let deleted = await Book.destroy({
            where:{
                book_id:req.params.id
            }
        })
        if(deleted){
            res.status(204).end();
        }
        else{
            res.status(404).json({error:"Couldnt find the book"})
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
})
module.exports = router;
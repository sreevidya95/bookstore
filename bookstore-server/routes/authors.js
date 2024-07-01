const express = require('express');
const router = express.Router();
const {Sequelize, where} = require('sequelize');
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
router.get("/:id",async (req,res)=>{
    try{
        let author = await Author.findByPk(req.params.id);
        if(author){
            res.status(200).json(author)
        }
        else{
            res.status(404).json({error:"couldnt find the Author"})
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }   

});
router.post("/",async (req,res)=>{
    try{
       const created = await Author.create(req.body);
        res.status(201).json(created);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.put("/:id",async (req,res)=>{
    try{
        const updated = await Author.update(req.body,{
            where:{
                author_id:req.params.id
            }
        })
        if(updated){
            const author = await Author.findByPk(req.params.id);
            res.status(200).json(author);
        }
        else{
            res.status(404).json({error:"couldnt find the author"})
        }
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.delete("/:id",async (req,res)=>{
    try{
        const deleted = await Author.destroy({
            where:{
                author_id:req.params.id
            }
        });
        if(deleted){
            res.status(204).end();
        }
        else{
            res.status(404).json({error:"couldnt find the author"})
        }
    }catch(err){
        res.status(500).json({error:err.message});
    }
})
module.exports = router;
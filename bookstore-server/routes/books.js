const express = require('express');
const CustomeError = require('../CustomError');
const router = express.Router();
const {Sequelize} = require("sequelize");
const {sequelize} = require('../models/sequelize');
const { where } = require('sequelize');
const author = require('../models/author')(sequelize);
const Book = require("../models/book")(sequelize);
const genere = require('../models/genere')(sequelize);
router.get('/',async (req,res,next)=>{
    try{
        const books = await Book.findAll({
            include:[{
                model:author,
                required:true,
            },
            {
                model:genere,
                required:true,
            },     
        ],
        });
            res.status(200).json(books);
    }
    catch(err){
        const e = new CustomeError(err.message,500)
                next(e);
      
    }
    
});
//sorting books by publication date
router.get('/:sort',async (req,res,next)=>{
    try{
        const books = await Book.findAll({
            include:[{
                model:author,
                required:true,
            },
            {
                model:genere,
                required:true,
            },    
        ],
        order: [['publication_date',req.params.sort]]
        });
            res.status(200).json(books);
    }
    catch(err){
        const e = new CustomeError(err.message,500)
                next(e);
      
    }
    
});
router.get('/:id',async(req,res,next)=>{
    try{
        const book = await Book.findByPk(req.params.id,{
            include:[
                {
                    model:author,
                    required:true,
                },
                {
                    model:genere,
                    required:true,
                }
            ]
        });
        if(book){
            res.status(200).json(book);
        }
        else{
            const e = new CustomeError("couldnt find the book",404)
            next(e);
        }
    }catch(error){
        const e = new CustomeError(error.message,500)
            next(e);
    }
});
router.post('/',async (req,res,next)=>{
    try{
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(error){
        const e = new CustomeError(error.message,500)
            next(e);
    }
});
router.put('/:id',async (req,res,next)=>{
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
            const e = new CustomeError("couldnt find the book",404)
            next(e);
        }
    }catch(error){
        const e = new CustomeError(error.message,500)
        next(e);
    }
    
});
router.delete('/:id',async (req,res,next)=>{
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
            const e = new CustomeError("couldnt find the book",404)
           next(e);
        }
    }catch(error){
        const e = new CustomeError(error.message,500)
        next(e);
    }
})
module.exports = router;
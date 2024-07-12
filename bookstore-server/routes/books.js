const express = require('express');
const CustomeError = require('../CustomError');
const router = express.Router();
const {Sequelize} = require("sequelize");
const {sequelize} = require('../models/sequelize');
const { where } = require('sequelize');
const author = require('../models/author')(sequelize);
const Book = require("../models/book")(sequelize);
const genere = require('../models/genere')(sequelize);
const multer  = require('multer');
const Offer = require('../models/Offer')(sequelize);
const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      return cb(
        null,file.originalname
      );
    },
  });
  const upload = multer({ storage: storage });
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
//getting books of particular author to display books of author
router.get('/author/:id',async (req,res,next)=>{
    try{
        const books = await Book.findAll({
           where:{
            AuthorAuthorId:req.params.id
           },
           attributes:["book_image",'title']
        });
            res.status(200).json(books);
    }
    catch(err){
        const e = new CustomeError(err.message,500)
                next(e);
      
    }
    
});
//sorting books by publication date and getting particular book
router.get('/:sort',async (req,res,next)=>{
    console.log(req.params.sort);
    if(req.params.sort ==='ASC' || req.params.sort==='DESC'){
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
    }
    else{
        try{
            const book = await Book.findByPk(req.params.sort,{
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

    }
    
});
router.post('/',upload.single('book_image'),async (req,res,next)=>{
    if(req.file){
        req.body.book_image = `http://localhost:3000/${req.file.path}`
     }
    try{
        console.log(req.body)
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(error){
        const e = new CustomeError(error.message,500)
            next(e);
    }
});
router.put('/:id',upload.single('book_image'),async (req,res,next)=>{
    if(req.file && typeof req.file==='object' && req.file!==null){
        req.body.book_image = `http://localhost:3000/${req.file.path}`
     }
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
const express = require('express');
const CustomeError = require('../CustomError');
const router = express.Router();
const {sequelize} = require('../models/sequelize');
const Author = require('../models/author')(sequelize);
const Books = require('../models/book')(sequelize);
const multer  = require('multer');
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
        const authors = await Author.findAll({
            order: [['createdAt', 'DESC']],
        });
            res.status(200).json(authors);
    }
    catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
    
});
router.get("/:id",async (req,res,next)=>{
    try{
        let author = await Author.findByPk(req.params.id);
        if(author){
            res.status(200).json(author)
        }
        else{
            const e = new CustomeError("couldnt find the author",404)
            next(e);
        }
    }catch(error){
        const e = new CustomeError(error.message,500)
        next(e);
    }   

});
router.post("/",upload.single('author_image'),async (req,res,next)=>{  
     if(req.file){
        req.body.author_image = `http://localhost:3000/${req.file.path}`
     }
    try{
       const created = await Author.create(req.body);
        res.status(201).json(created);
    }catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
});
router.put("/:id",upload.single('author_image'),async (req,res,next)=>{
    if(req.file && typeof req.file==='object' && req.file!==null){
        req.body.author_image = `http://localhost:3000/${req.file.path}`
     }
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
            const e = new CustomeError("couldnt find the author",404)
             next(e);
        }
    }catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
});
router.delete("/:id",async (req,res,next)=>{
    try{
        let books = await Books.findAll({
            where:{
                AuthorAuthorId:req.params.id
            }
        });
        if(books && books.length>0){
            const e = new CustomeError("Cant Delete this Author,There are books corresponding to this Author",404)
            next(e);
        }
        else{
            const deleted = await Author.destroy({
                where:{
                    author_id:req.params.id
                }
            });
            if(deleted){
    
                res.status(204).end();
            }
            else{
                const e = new CustomeError("couldnt find the author",404)
                next(e);
            }
        }
    }catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
})
module.exports = router;
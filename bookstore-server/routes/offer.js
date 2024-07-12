const express = require('express');
const CustomeError = require('../CustomError');
const cors = require('cors');
const router = express.Router();
const { sequelize } = require("../models/sequelize");
const { where } = require('sequelize');
const Offer = require("../models/Offer")(sequelize);
const Book=require("../models/book")(sequelize);
router.post('/', async (req, res, next) => {
    try {
        const data = await Offer.findAll({
            where: {
                name:req.body.name, 
                discount:req.body.discount, 
                startDate:req.body.startDate,
                enddate:req.body.endDate,
            }
        }); 
        if(data.length>0){
            const e = new CustomeError("This Offer Already Exists",404)
            next(e);
        }
        else{
            const data = await Offer.create({name:req.body.name, 
                discount:req.body.discount, 
                startDate:req.body.startDate, 
                enddate:req.body.endDate});
             const book = await Book.update({offerOfferId : data.offer_id},{
                where:{
                    book_id:req.body.book
                }
            })
            if(book){
                    return res.status(201).json(data);
                }
            else{
            res.status(500).json({msg:"Offer got added But Couldnt apply that on Books due to Some Problems",status:500});
            next(e);
            }
        } 
    }   
    catch (error) {
        const e = new CustomeError(error.message, 500)
        next(e);
    }
});

router.get("/",async (req,res,next) => { 
      try{
        const data = await Offer.findAll();
         res.status(200).json(data)
      }catch(e){
        const err = new CustomeError(e.message,500);
        next(err);
      }
});
module.exports = router;
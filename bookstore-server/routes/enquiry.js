const express = require("express");
const CustomeError = require('../CustomError');
const router = express.Router();
const cors = require('cors');
const {sequelize} = require("../models/sequelize");
const Enquiry = require("../models/enquiry")(sequelize);
router.get("/",async(req,res,next)=>{
    try{
        const enquiry = await Enquiry.findAll();
            res.status(200).json(enquiry);
    }catch(err){
        const e = new CustomeError(err.message,500)
        next(e);
    }
});
router.put("/:id",async(req,res,next)=>{
    try{
        const update = await Enquiry.update({isRead:1},{
            where:{
                enq_id:req.params.id
            }
        })
        if(update){
            let enquiry =await Enquiry.findByPk(req.params.id);
            res.status(200).json(enquiry)
        }
        else{
            const e = new CustomeError("couldnt find this message",404)
        next(e);
        }
    }catch(e){
        const err = new CustomeError(e.message,500)
        next(err);
    }
});
router.delete("/:id",async (req,res,next)=>{
    try{
      const d = await Enquiry.destroy({
        where:{
            enq_id:req.params.id
        }
      })
      if(d){
        res.status(204).end();
      }
    }catch(e){
        const err = new CustomeError(e.message,500)
        next(err);
    }
});
router.post("/",async (req,res,next)=>{
    try{
        const enquiry = await Enquiry.create(req.body);
                res.status(201).json(enquiry);
    }catch(e){
        const err = new CustomeError(e.message,500)
        next(err);
    }
});
module.exports=router;
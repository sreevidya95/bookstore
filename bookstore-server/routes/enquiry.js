const express = require("express");
const router = express.Router();
const { Sequelize } = require('sequelize');
const enquiry = require("../models/enquiry");
const sequelize = new Sequelize("bs", 'root', 'Saibaba123456@', {
    host: "localhost",
    dialect: "mysql",
});
const Enquiry = require("../models/enquiry")(sequelize);
router.get("/",async(req,res)=>{
    try{
        const enquiry = await Enquiry.findAll();
            res.status(200).json(enquiry);
    }catch(err){
        res.send(500).json({error:err.message})
    }
});
router.patch("/:id",async(req,res)=>{
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
            res.status(404).json({error:"couldnt find thiis message"})
        }
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
router.delete("/:id",async (req,res)=>{
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
        res.send(500).json({error:e.message});
    }
});
router.post("/",async (req,res)=>{
    try{
        const enquiry = await Enquiry.create(req.body);
                res.status(201).json(enquiry);
    }catch(e){
        res.status(500).json({error:"something went wrong"})
    }
});
module.exports=router;
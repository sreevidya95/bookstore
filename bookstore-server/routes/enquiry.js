const express = require("express");
const router = express.Router();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("bs", 'root', 'Saibaba123456@', {
    host: "localhost",
    dialect: "mysql",
});
const Enquiry = require("../models/enquiry")(sequelize);
router.get("/",async(req,res)=>{
    try{
        const enquiry = await Enquiry.findAll();
        if(enquiry){
            console.log(enquiry)
            res.status(200).json(enquiry);
        }
        else{
            res.status(404).json({error:"No enquiries"})
        }
    }catch(err){
        res.send(500).json({error:err.message})
    }
})
module.exports=router;
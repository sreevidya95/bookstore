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
            res.status(200).json(enquiry);
    }catch(err){
        res.send(500).json({error:err.message})
    }
})
module.exports=router;
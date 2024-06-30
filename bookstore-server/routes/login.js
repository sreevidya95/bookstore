const express = require("express");
const router = express.Router();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("bs", 'root', 'Saibaba123456@', {
    host: "localhost",
    dialect: "mysql",
});
const Admin = require("../models/Admin")(sequelize);
router.get('/',async (req,res)=>{
    try{
        const admin = await Admin.findAll();
        console.log(admin)
        if(admin){
            res.status(200).json(admin);
        }
        else{
            res.status(404).json({error:"Something went wrong"});
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
module.exports=router;
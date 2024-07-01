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
            res.status(200).json(admin);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
module.exports=router;
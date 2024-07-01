const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const mail = require('node-mailer');
const sequelize = new Sequelize("bs", 'root', 'Saibaba123456@', {
    host: "localhost",
    dialect: "mysql",
});
const Admin = require("../models/Admin")(sequelize);
router.get('/:email',async (req,res)=>{
    try{
        const admin = await Admin.findOne({
            where:{
                email:req.params.email
            }
        });
            res.status(200).json(admin);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
router.post('/fp/:email', async(req,res)=>{
   const transport = mail.createTransport({
    service:'gmail',
    auth:{
        user:'tapp93550@gmail.com',
        pass:'hijl zvbh ciyg sacu'
    }
});
var mailOptions={
    from:'tapp93550@gmail.com',
     to:req.body.mail,
     subject:'forgot passsword',
     text:`here is your password to login into the book store app :${req.body.text}`
};
transport.sendMail(mailOptions,(err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(res.response);
    }
});

})
module.exports=router;
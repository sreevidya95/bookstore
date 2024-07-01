const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const mail = require('nodemailer');
const {sequelize} = require("../models/sequelize");
const Admin = require("../models/Admin")(sequelize);
async function authenticateAdmin(email){
    const admin = await Admin.findOne({
        where:{
            email:email,
        }
    });
    return admin; 
}
router.post('/',async (req,res)=>{
    try{
        const admin = await authenticateAdmin(req.body.email);
           if(admin){
            const valid = await bcrypt.compare(req.body.password, admin.get("password"));
            if(valid){
                res.status(200).json(admin);
            }
            else{
                res.status(404).json({error:"invalid password"})
            }    
           }
           else{
            res.status(404).json({error:"invalid user name or password"})
           }
            
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
});
router.post('/fp', async(req,res)=>{
    try{
        const admin = authenticateAdmin(req.body.email);
        if(admin){
            const transport = mail.createTransport({
                service:'gmail',
                auth:{
                    user:'tapp93550@gmail.com',
                    pass:'hijl zvbh ciyg sacu'
                }
            });
            var mailOptions={
                from:'tapp93550@gmail.com',
                to:req.body.email,
                subject:'forgot passsword',
                text:`here is your link to create new password for book store application`
            };
            transport.sendMail(mailOptions,(err,response)=>{
                if(err){
                res.status(500).json({error:err});
                }
                else{
                res.status(200).json({msg:"Email sent"});
                }
            });
        }
        else{
            res.status(404).json({error:"Seems like you dont have the account"});
        }
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
router.post("/new",async(req,res)=>{
      try{
         req.body.password = await bcrypt.hash(req.body.password,10);
        const admin = await Admin.create(req.body);
        res.status(201).json(admin)
      }catch(e){
        res.status(500).json({error:e.message})
      }
})
module.exports=router;
const express = require("express");
const CustomeError = require('../CustomError');
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
router.post('/',async (req,res,next)=>{
    try{
        const admin = await authenticateAdmin(req.body.email);
           if(admin){
            const valid = await bcrypt.compare(req.body.password, admin.get("password"));
            if(valid){
                res.status(200).json(admin);
            }
            else{
                const err = new CustomeError("invalid password",404)
                next(err);
            }    
           }
           else{
                    const err = new CustomeError("invalid username or password",404)
                    next(err);
           }
            
    }
    catch(e){
        const err = new CustomeError(e.message,500)
                next(err);
       
    }
    
});
router.post('/fp', async(req,res,next)=>{
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
                text:`here is your link to create new password for book store application ${req.body.url}/true`
            };
            transport.sendMail(mailOptions,(err,response)=>{
                if(err){
                    const e = new CustomeError(err.message,500)
                    next(e);
                }
                else{
                res.status(200).json({msg:"Email sent"});
                }
            });
        }
        else{
            const err =  new CustomeError("seems like you dont have account",404)
                next(err);
        }
    }catch(e){
        const err = new CustomeError(e.message,500)
                next(err);
    }
});
router.post("/new",async(req,res,next)=>{
      try{
         req.body.password = await bcrypt.hash(req.body.password,10);
         console.log(req.body)
        const admin = await Admin.create(req.body);
        res.status(201).json(admin)
      }catch(e){
        const err = new CustomeError(e.message,500)
                next(err);
      }
});
router.put('/newPassword/:email',async (req,res,next)=>{
    try{
        const admin = authenticateAdmin(req.params.email);
        if(admin){
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password,10);
            }
            let updated = await Admin.update(req.body,{
                where:{
                    email : req.params.email
                }
            })
            if(updated){
                res.status(200).json({msg:"updated successfully"})
            }
            else{
                const err = new CustomeError("couldnt update password",404)
                next(err);
            }
        }
        else{
            const err = new CustomeError("invalid email",404)
                next(err);
        }
    }catch(e){
        const err = new CustomeError(e.message,500)
                next(err);
    }
   
    
})
module.exports=router;
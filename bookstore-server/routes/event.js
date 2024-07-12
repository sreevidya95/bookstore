const express = require("express");
var cron = require('node-cron');
const mail = require('nodemailer');
const router = express.Router();
router.post("/",async (req,res,next)=>{
   try{
    function formatDateMoment(momentDate) {
        const date = new Date(momentDate);
        return `${date.getSeconds()} ${date.getMinutes() + 1} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} ${date.getDay()}`;
      }
    var task=cron.schedule(formatDateMoment(req.body.date), () => {
        const transport = mail.createTransport({
            service:'gmail',
            secure: true,
            auth:{
                user:'tapp93550@gmail.com',
                pass:'hijl zvbh ciyg sacu'
            }
        });
        var mailOptions={
            from:'tapp93550@gmail.com',
             to:req.body.email,
             subject:'Reminder',
             text:req.body.event
        };
        transport.sendMail(mailOptions,(err,res)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(res.response);
                task.stop();
            }
        });
        console.log('running a task every minute');
      });
      res.status(200).json({status:200,msg:"Reminder Set"});
   }catch(err){
    res.status(500).json({status:200,msg:err.message});
   }
});
module.exports=router;
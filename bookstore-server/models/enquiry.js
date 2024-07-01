const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize("bs","root","Saibaba123456@",{
    host:"localhost",
    dialect:"mysql"
});
module.exports = (sequelize) => {
const Enquiry = sequelize.define("Enquiry",{
    enq_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        },
        message:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        isRead:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:0,
        }
    }
});
return Enquiry;
}
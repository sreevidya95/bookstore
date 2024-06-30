const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('bs','root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql"
});
module.exports = (sequelize) => {
const Admin = sequelize.define("Admin",{
    admin_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});
return Admin;
}
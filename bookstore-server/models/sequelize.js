const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
module.exports = {sequelize,DataTypes};
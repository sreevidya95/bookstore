const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('bs','root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql"
});
module.exports = (sequelize) => {
const Genere = sequelize.define('Genere',{
    genere_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    genere_name:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});
return Genere;
}
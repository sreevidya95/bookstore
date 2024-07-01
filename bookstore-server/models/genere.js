const {sequelize,DataTypes} = require("./sequelize");
module.exports = (sequelize) => {
const Genre = sequelize.define('Genre',{
    genre_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    genre_name:{
        type:DataTypes.STRING(30),
        allowNull:false
    }
});
return Genre;
}
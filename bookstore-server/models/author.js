const {sequelize,DataTypes} = require("./sequelize");
module.exports = (sequelize) => {
const Author = sequelize.define("Author",{
    author_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(30),
        allowNull:false,
    },
    biography:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    author_image:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null,
    }
});
return Author;
}

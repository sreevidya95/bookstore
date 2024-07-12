const {sequelize,DataTypes} = require("./sequelize");
module.exports = (sequelize) => {
const offer = sequelize.define("offer",{
    offer_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    discount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    enddate:{
        type:DataTypes.DATE,
        allowNull:false
    }
});
return offer;
}
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
module.exports = (sequelize) => {
const Book = sequelize.define("Book",{
    book_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    author_id:{
         type:DataTypes.INTEGER,
         allowNull:false
    },
    genere_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    publication_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    book_image:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isUrl:true
        }
    }
});
Book.associate = models => {
    const Author = require('./author');
const Genere = require('./genere');
Author.hasMany(Book,{foreignKey:'author_id'});
Book.belongsTo(Author);
Genere.hasMany(Book,{foreignKey:'genere_id'});
Book.belongsTo(Genere);
  }

return Book;
}
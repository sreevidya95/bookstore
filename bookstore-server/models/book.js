const {sequelize,DataTypes} = require("./sequelize");
const Author = require('./author')(sequelize);
const Genere = require('./genere')(sequelize);
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
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    publication_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    book_image:{
        type:DataTypes.STRING,
        allowNull:true,
    }
});
    
Author.hasMany(Book);
Book.belongsTo(Author);
Genere.hasMany(Book);
Book.belongsTo(Genere);

return Book;
}
const express = require('express');
const router = require('routes');
const path = require('path');
const cors = require('cors');
const app = express();
const CustomeError = require('./CustomError');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("bs", 'root', 'Saibaba123456@', {
    host: "localhost",
    dialect: "mysql",
});
const Admin = require('./models/Admin')(sequelize);
const Author = require('./models/author')(sequelize);
const Enquiry = require("./models/enquiry")(sequelize);
const Genere = require("./models/genere")(sequelize);
const Book = require('./models/book')(sequelize);
// sequelize.sync({force:true})
sequelize.sync()
    .then(() => console.log("databases synced"))
    .catch(err => console.error(err));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, '/')));
app.use(cors());
const bookRouter = require("./routes/books");
const AuthorRouter = require('./routes/authors');
const GenereRouter = require("./routes/genres");
const EnquiryRouter = require("./routes/enquiry");
const AdminRouter = require("./routes/login");
app.use("/books", bookRouter);
app.use("/authors", AuthorRouter);
app.use("/generes", GenereRouter);
app.use("/enquiry",EnquiryRouter);
app.use("/login",AdminRouter);
app.get("/", (req, res) => {
    res.send("welcome!!!!")
})
app.all("*",(req,res,next)=>{
    const err = new CustomeError("couldnt find the above url in server",404)
    next(err);
})
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status:err.statusCode,
        msg:err.message
    })
})
app.listen(3000, () => {
    console.log("listening to port 3000");
})



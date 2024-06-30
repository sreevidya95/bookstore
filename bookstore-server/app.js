const express = require('express');
const router = require('routes');
const path = require('path');
const cors = require('cors');
const app = express();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bs",'root','Saibaba123456@',{
    host:"localhost",
    dialect:"mysql",
});
const Admin = require('./models/Admin')(sequelize);
const Author = require('./models/author')(sequelize);
const Enquiry = require("./models/enquiry")(sequelize);
const Genere = require("./models/genere")(sequelize);
const Book = require('./models/book')(sequelize);
sequelize.sync()
.then(()=>console.log("databases synced"))
.catch(err=>console.error(err));
app.use('/', express.static(path.join(__dirname, '/')));
app.use(cors());
app.listen(3000,()=>{
    console.log("listening to port 3000");
})



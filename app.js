const express =  require("express");
const app =  express();
const cookieParser = require('cookie-parser');
const path = require("path");

const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productRouter = require("./routes/productRouter")
 
const db = require('./config/mongoose-connection')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


// call all the routers 
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);


app.get('/',(req, res)=>{
    res.send("hey")
})

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000 go an chek it out ");
});




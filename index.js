const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const connection=require("./database/database");

//controllers
const articleController=require("./articles/articlesController");
const categoriesController=require("./categories/categoriesController");
const usersController = require("./users/usersController");

//BD models
const Article=require("./articles/Article");
const Category=require("./categories/Category");
const Users= require("./users/Users");

var session=require("express-session");

//test BD connection
connection
    .authenticate()
    .then(()=>{
        console.log("Database up and running ");
    })
    .catch(()=>{
        console.log("Failure on database connection")
    })

//Add views engine
app.set('view engine','ejs');

//Add public static folder
app.use(express.static('public'));

//setting bodyParser for capture forms
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//sessions
app.use(session({
    secret: "bruce",
    cookie: {maxAge: 60000}
}));
app.get("/session",(req,res)=>{
    req.session.user="bruce123";
    req.session.trainamento="js";
    req.session.logged= false;

    res.send("sessão gerada!")
});

app.get("/readSession",(req,res)=>{
    res.json({user: req.session.user,
        logged: req.session.logged
    });
});

//import routes from other files
app.use("/",articleController);
app.use("/",categoriesController);
app.use("/",usersController);
 


//running server
app.listen('8000',()=>{
    console.log("server running ok");
})
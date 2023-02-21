const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const connection=require("./database/database");

const articleController=require("./articles/articlesController");
const categoriesController=require("./categories/categoriesController");
const usersController = require("./users/usersController");

const Article=require("./articles/Article");
const Category=require("./categories/Category");
const Users= require("./users/Users");

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


//import routes from other files
app.use("/",articleController);
app.use("/",categoriesController);
app.use("/",usersController);

//running server
app.listen('8000',()=>{
    console.log("server running ok");
})
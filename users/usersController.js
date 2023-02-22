const express= require("express");
const router= express.Router();
const Users= require ("./Users");
const bcrypt= require("bcryptjs");

router.get("/admin/users", (req,res)=>{
    res.render("./admin/users/create");
});

router.post("/admin/users/create", (req,res)=>{
    var email= req.body.email;
    var password= req.body.password; 

    var salt = bcrypt.genSaltSync(10);
    var hash= bcrypt.hashSync(password,salt);

    if(hash !=undefined){
       Users.create({
        email:email,
        password:hash
       }).then(()=>{
        res.redirect("/admin/users");
       }) 
    }
    
    
})



module.exports= router
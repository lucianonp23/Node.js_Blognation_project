const express= require("express");
const router= express.Router();
const Users= require ("./Users");
const bcrypt= require("bcryptjs");


//page for list of users
router.get("/admin/users",(req,res)=>{
    Users.findAll().then(users=>{
       res.render("admin/users/index",{users:users}) 
    })
    
})

//page for user creation
router.get("/admin/users/create", (req,res)=>{
    res.render("admin/users/create");
});

//saving user data on BD
router.post("/users/create", (req,res)=>{
    var email= req.body.email;
    var password= req.body.password; 

    Users.findOne({where:{email:email}}).then(user=>{
        if(user==undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash= bcrypt.hashSync(password,salt);

            Users.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect("/admin/users");
            }).catch(err=>{
                res.redirect("/admin/users");
            })
            
        }else{
            res.redirect("/admin/users");
        }
    });
    
    
    
    
})



module.exports= router
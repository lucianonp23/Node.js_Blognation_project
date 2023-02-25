const express= require("express");
const router= express.Router();
const Users= require ("./Users");
const bcrypt= require("bcryptjs");
const adminAuth=require("../middlewares/adminAuth");


//page for list of users
router.get("/admin/users",adminAuth,(req,res)=>{
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
    

});

//login authentication
router.get("/users/login",(req,res)=>{
    res.render("admin/users/login");
});

router.post("/users/authenticate",(req,res)=>{
    var email= req.body.email;
    var password = req.body.password;

    Users.findOne({where:{
        email:email
    }}).then(user=>{
        if(user !=undefined){
            var passwordCheck= bcrypt.compareSync(password,user.password)
            if (passwordCheck){
                req.session.user={
                    email:email,
                    password:password
                }
            res.json(req.session.user);
            }else {
                res.redirect("/users/login");   
            }
            
           
        }else{
            res.redirect("/users/login");
        }
    })
})



module.exports= router
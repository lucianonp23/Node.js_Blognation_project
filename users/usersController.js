const express= require("express");
const router= express.Router();
const Users= require ("./Users");

router.get("/admin/users", (req,res)=>{
    res.send("listagem de usuarios");
})



module.exports= router
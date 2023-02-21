const express= require ("express");
const Category = require("./Category");
const router= express.Router();
const slugify = require("Slugify");
const { response } = require("express");

router.get("/admin/categories/new",function(req,res){
    res.render("./admin/categories/new");
});

//route for saving a category
router.post("/categories/savingCategory", function(req,res){
    var title = req.body.title;

    if(title !=undefined){
        Category.create({
            title:title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        }) 
    }else{
        res.redirect("/admin/categories/new");
    }
    
});

//route for delete a category
router.post("/admin/categories/delete", function(req,res){
    var id= req.body.categoryId; 
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }
    }


});


router.get("/admin/categories",function(req,res){
    Category.findAll().then(categories=>{
        
        res.render("./admin/categories/list",{categories:categories});
    });
        
});

//Route for edit category
router.get("/admin/categories/edit/:id",function(req,res){
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category=>{
            if(category !=undefined){
                res.render("./admin/categories/edit",{category:category});
            }else{
                res.redirect("/admin/categories");
            }
            
        }).catch(error=>{
            res.redirect("/admin/categories");
        })
     
});

//Updating category
router.post("/categories/updateCategory", function(req,res){
    var title= req.body.title;
    var id= req.body.id;

    Category.update({title:title, slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    });


});



module.exports= router
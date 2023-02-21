const express= require ("express");
const slugify = require("slugify");
const router= express.Router();
const Category= require("../categories/Category");
const Article = require("./Article");


router.get("/articles",function(req,res){
    res.send("Esse é o meu campo de artigos");
});

//Creating an article
router.get("/admin/articles/new",function(req,res){
    Category.findAll().then(categories=>{
        res.render("./admin/articles/new",{categories:categories});
    });
    
    
});

//Saving an article
router.post("/articles/savingArticles", function(req,res){
    var title=req.body.title;
    var body= req.body.body;
    var categoryId= req.body.category;

    if (title !=undefined){
        Article.create({
            title:title,
            slug: slugify(title),
            body:body,
            categoryId:categoryId
        }).then(()=>{
            res.redirect("/admin/articles");
        })
    }

});

//List articles

router.get("/admin/Articles",(req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then(articles=>{
        res.render("./admin/articles/listArticles", {articles:articles});
    })
    
    
});

//delete articles
router.post("/admin/articles/delete",(req,res)=>{
    var id= req.body.articleId;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect("/admin/articles")
    
            })
        
        }
    }
});

//display articles on homepage
router.get("/", function(req,res){
    Article.findAll({
        order:[["id","DESC"]],
        limit:4 
    }).then((articles)=>{
        Category.findAll().then(category=>{
            res.render("index",{articles:articles,category:category});
        })
    })
    
});
//article page
router.get("/:slug",(req,res)=>{
    var slug= req.params.slug 

    Article.findAll({
        where:{slug:slug}
    }).then(article=>{
        if (article != undefined){
            Category.findAll().then(category=>{
                res.render("article",{article:article,category:category});
            })
        }
        
    })

    
});

//display articles by category 
router.get("/category/:slug",(req,res)=>{
    var slug= req.params.slug;

    Category.findOne({
        where:{slug:slug},
        include:[{model:Article}]

    }).then(category=>{
        if(category !=undefined){
            Category.findAll().then(categories=>{
                res.render("index",{articles:category.articles,category:categories});
            })
        } else{
            res.render("/");
        }
    }).catch(error=>{
        res.render("/");
    })
});

// edit/updating an article
router.get("/admin/articles/:id", (req,res)=>{
    var id= req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles")
    }else{
        Article.findByPk(id, {include:[{model:Category}]}).then(article=>{
            Category.findAll().then(categories=>{
                res.render("admin/articles/editArticle",{article:article,categories:categories});
            })
        })
    }
});

router.post("/admin/articles/updateArticle", (req,res)=>{
    var title= req.body.title;
    var body= req.body.body;
    var id = req.body.id;
    var categoryId= req.body.category;

    if (id !=undefined){
        Article.update({title:title, slug:slugify(title),body:body,categoryId:categoryId},{
            where:{
                id:id
            }
        }).then(()=>{
        res.redirect("/admin/articles")
        }).catch(err=>{
            res.redirect("/")
        })

    }

});

router.get("/articles/page/:number", (req,res)=>{
    var page= req.params.number;
    var offset = 0;
    if(isNaN(page) || page==1){
       offset = 0; 
    }else{
        offset=((parseInt(page))-1)*4;
    }
    Article.findAndCountAll({
                limit:4,
                offset: offset
            }).then(articles=>{
                var next;

                if(offset+4>= articles.count){
                    next=false;
                } else{
                    next=true;
                }

                var result= {
                    next: next,
                    articles:articles,
                    page: parseInt(page)
                }
                
                
               Category.findAll().then(category=>{
                res.render("admin/articles/page",{
                    result:result,
                    category:category
                })
               })

               
                
            })
    
    
})


module.exports= router
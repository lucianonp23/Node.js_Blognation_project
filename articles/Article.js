const Sequelize=require("sequelize");
const Category = require("../categories/Category");
const connection= require("../database/database");

const Article= connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.STRING,
        allowNull:false
    }

});

Article.belongsTo(Category);
Category.hasMany(Article);



module.exports=Article;
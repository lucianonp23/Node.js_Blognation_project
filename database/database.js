const Sequelize=require('sequelize');
const connection= new Sequelize('blognation','root','lnp22765',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports=connection;
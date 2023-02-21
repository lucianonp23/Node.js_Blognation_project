const connection= require ("../database/database");
const Sequelize= require("sequelize");

const Users = connection.define("users", {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Users.sync({force:false});

module.exports= Users;
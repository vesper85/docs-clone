import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import Document from "./Document.js";

class User extends Model {};


// User schema
/*
    srno,
    first_name,
    last_name,
    email,
    password,
    createdat,

    */

User.init({
    first_name:{
        type: DataTypes.STRING,
    },
    last_name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        primaryKey:true
    },
    password:{
        type: DataTypes.STRING,
    }
},{
    sequelize // We need to pass the connection instanc
})




export default User
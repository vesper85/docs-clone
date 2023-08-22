import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

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
    },
    password:{
        type: DataTypes.STRING,
    },
    doc_ids:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    }
},{
    sequelize // We need to pass the connection instanc
})

try {
    await User.sync()
    console.log('table synced');
} catch (error) {
    console.log(error);
}


export default User
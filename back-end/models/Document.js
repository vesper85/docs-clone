import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

class Document extends Model{};

// Document Schema
/*
    createBy,
    title,
    data,

*/

Document.init({
    title:{
        type: DataTypes.STRING
    },
    data:{
        type:DataTypes.JSON
    },
    doc_id:{
        type:DataTypes.STRING
    }
},{
    sequelize
})


export default Document
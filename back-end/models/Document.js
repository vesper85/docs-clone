import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Document extends Model{};

// Document Schema
/*
    createBy,
    data,

*/

Document.init({
    createdBy:{
        type:DataTypes.STRING
    },
    data:{
        type:DataTypes.JSON
    }
},{
    sequelize
})

try {
    await Document.sync()
    console.log('table synced');
} catch (error) {
    console.log(error);
}

export default Document
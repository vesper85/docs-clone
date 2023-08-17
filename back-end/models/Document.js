import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Document extends Model{};

// Document Schema
/*
    createBy,
    title,
    data,

*/

Document.init({
    owner:{
        type:DataTypes.STRING
    },
    data:{
        type:DataTypes.STRING
    }
},{
    sequelize
})

// try {
//     await Document.sync()
//     console.log('table synced');
// } catch (error) {
//     console.log(error);
// }

export default Document
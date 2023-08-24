import sequelize from "../config/db.js";
import Document from "./Document.js";
import User from "./User.js";


User.hasMany(Document);

try {
    await User.sync()
    console.log('table synced');
} catch (error) {
    console.log(error);
}

Document.belongsTo(User)

try {
    await Document.sync()
    console.log('table synced');
} catch (error) {
    console.log(error);
}


export {Document, User}



const mongoose = require('mongoose');

const dbURL = process.env.MONGO_CONN;

const connectToDb = ()=>{
mongoose.connect(dbURL).then(() => {
    console.log("DB Connected successfully")
}
).catch((error) => {
    console.log(`connection error${error}`);

});


}
module.exports = connectToDb;

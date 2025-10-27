const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajvibes2007_db_user:QQcc%40123@cluster0.s4xc7k9.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
})

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}
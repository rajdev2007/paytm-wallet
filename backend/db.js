const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajvibes2007_db_user:QQcc%40123@cluster0.s4xc7k9.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    }
},
    {password: {
        type: String,
        required: true,
        minLength: 6
    }
},
    {firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    }
},
    {lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    }
})

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "blog"
    }]
});

module.exports = mongoose.model("User", UserSchema);
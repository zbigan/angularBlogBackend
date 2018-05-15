const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passwordFunctions = require("../functions/user-password-functions");

const UserSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "blog"
    }]
});

// UserSchema.pre("save", passwordFunctions.hashPassword);

// UserSchema.methods.comparePassword = passwordFunctions.comparePassword;

module.exports = mongoose.model("User", UserSchema);
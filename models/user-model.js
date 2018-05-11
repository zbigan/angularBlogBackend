const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const passwordFunctions = require("../functions/user-password-functions");
const joim = require("joigoose")(mongoose);
const joi = require("joi");

const UserSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "blog"
    }]
});

UserSchema.pre("save", passwordFunctions.hashPassword);
UserSchema.methods.comparePassword = passwordFunctions.comparePassword;

module.exports = mongoose.model("User", UserSchema);
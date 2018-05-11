const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    image: String,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("Blog", blogSchema);
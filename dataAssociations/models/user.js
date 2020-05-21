var mongoose=require('mongoose');

var userScehma = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userScehma);

module.exports=User;
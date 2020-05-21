var mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/data_association_embed");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userScehma=new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    posts:[postSchema]
}); 

var User=mongoose.model("User",userScehma);

var newUser=new User({
    name: "Hermione",
    age: 23,
    email: "hermione@hogwarts.edu"
});

// newUser.posts.push({
//     title:"how to make potions",
//     content:'go attend the class ! :)'
// });

// newUser.save(function (err,user) {
//     if(err){
//         console.log(err);
//     } 
//     else{
//         console.log(user);
//     }
// });

// User.findOne({name:"Hermione"},function (err,foundUser) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         foundUser.posts.push({
//             title:"things I hate are :",
//             content:"voldemort voldemort voldemort !! "
//         });
//         foundUser.save(function (err,user) {
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(user);
//             }
//         });
//     }
// });


//  to display the contents of all users and their posts
// User.find({},function (err,allUsers) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         allUsers.forEach(function (user) {
//             console.log(user.name);
//             user.posts.forEach(function (post) {
//                 console.log(post);
//             });
//         });
//     }
// });

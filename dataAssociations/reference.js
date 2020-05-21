var mongoose=require('mongoose'),
    Post    =require('./models/post'),
    User    =require("./models/user");

mongoose.connect('mongodb://localhost/data_association_reference');

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob",
//     age: 34
// });

// Post.create({
//     title:"how to cook the best burger part3",
//     content: "gibberish gibberish"
// },function (err,post) {
//     if(!err){
//         User.findOne({email:"bob@gmail.com"},function (err,foundUser) {
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 foundUser.posts.push(post);
//                 foundUser.save(function (err,savedPost) {
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log(savedPost);
//                     }
//                 });
//             }
//         });
//     }
// });


// User.find({},function (err,data) {
//     if(!err){
//         console.log(data);
//     }
// });

// find the user and find all the posts associated with that user
User.findOne({email:'bob@gmail.com'}).populate(("posts")).exec(function (err,user) {
    if(err){
        console.log(err);
    }
    else{
        console.log(user);
    }
});

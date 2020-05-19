var mongoose=require('mongoose');
// connect to a database
mongoose.connect("mongodb://localhost/cat_app");

// define what a cat looks like
// just the definition but we need not do this always just providing structure

var catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});

// defining the model
var Cat=mongoose.model("Cat",catSchema);

// "Cat" inside the quotes above is supposed to be singular
// Cat has all the methods that we want to have like create,remove,update

// adding  a new cat to database

// Cat.create({
//     name:"Snowhite",
//     age:15,
//     temperament:"bland"
// },function (err,cat) {
//     if(err){
//         console.log("something went wrong");
//     }
//     else{
//         console.log("added ");
//         console.log(cat);
//     }
// });
// var george=new Cat({
//     name:"Mrs.Norris",
//     age:7,
//     temperament:"evil"
// });

// george.save(function (err,cat) {
//     if(err){
//         console.log("SOMETHING WENT WRONG!");
//     }else{
//         console.log("WE just added a new cat: ");
//         console.log(cat);
//     }
// });

// retrieve all cats from database console.log() each cat
Cat.find({},function (err,cats) {
    if(err){console.log("some error");
    console.log(err);
    }
    else{
        console.log("all the cats : ");
        console.log(cats);
    }
});

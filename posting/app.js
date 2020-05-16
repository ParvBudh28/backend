var express=require('express');
var bodyParser=require('body-parser');
var app=express();

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));

var friends=[];

app.get("/", function (req,res) {
    res.render('index');
});

app.get("/friendlist", function (req,res) {
    res.render("friendList", {friends:friends});
});

app.post("/addfriend",function (req,res) {
    var newfriend=req.body;
    friends.push(newfriend.friendName);
    res.redirect("/friendlist");
});

app.get("*",function (req,res) {
    res.send("Hi welcome to adding friend exercise!");
});

app.listen(3000 ,function () {
    console.log("server started at port 3000");
});

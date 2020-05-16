var express=require("express");
var app=express();

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/", function(req,res){
	res.send("hi there we are on port 3000");
});

app.get("/hi/:name", function(req,res){
	let name=req.params.name;
	res.render("basic", {name:name} )
});

app.get("/new", function(req,res){
	res.render("second");
});

app.listen(3000,function(){
	console.log("server started!");
});
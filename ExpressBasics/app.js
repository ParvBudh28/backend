var express=require("express");
var app=express();

var sounds={
	dog : "woof woof",
	cat : "meow",
	pig : "oink oink"
};

app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment!");
	console.log("/ visited");
});

app.get("/speak/:animal",function(req,res){
	var animal= req.params.animal;
	// console.log(animal);
	res.send("the animal says "+ "'"+ sounds[animal] +"'");
	console.log("/speak/"+animal+" visited");
});

app.get("/repeat/:word/:n", function(req,res){
	var n=req.params.n;
	var word=req.params.word;
	var ans="";
	for(i=0;i<n;i++){
		ans+=" "+word;
	}

	res.send(ans);

	console.log("/speak/word/n visited");

});

app.get("*",function(req,res){
	res.send("HOW YOU DOIN !!");
});

app.listen(3000, function(){
	console.log("server started");
});
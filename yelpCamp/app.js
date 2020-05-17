const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

let campgrounds=[
    {
        name:"Camp One",
        image: "https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg?cs=srgb&dl=photo-of-tent-in-forest-2609954.jpg&fm=jpg"
    },
    {
        name:"Camp Two",
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=six-camping-tents-in-forest-699558.jpg&fm=jpg"
    },
    {
        name:"Camp Three",
        image:"https://images.pexels.com/photos/2422968/pexels-photo-2422968.jpeg?cs=srgb&dl=man-sitting-facing-fire-in-pot-during-night-2422968.jpg&fm=jpg"
    }
]

app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function (req,res) {
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function (req,res) {
    let name=req.body.name;
    let image=req.body.image;
    campgrounds.push({name:name,image:image});
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function (req,res) {
    res.render("new");
});

app.listen('3000',function () {
    console.log("yelp camp server started!");
})

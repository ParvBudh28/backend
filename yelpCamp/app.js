const   express=        require('express'),
        app=            express(),
        bodyParser=     require('body-parser'),
        mongoose=       require('mongoose');
        
mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({ extended: true }))

var campgroundSchema=new mongoose.Schema({
    name:String,
    image: String,
    desc: String
});

var Campground=mongoose.model("Campground",campgroundSchema);

app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function (req,res) {
    Campground.find({}, function (err,allCampgrounds) {
        if(err){
            console.log("something went wrong");
        }
        else{
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

app.post("/campgrounds",function (req,res) {
    let name=req.body.name;
    let image=req.body.image;
    let desc=req.body.description;

    Campground.create({
        name:name,
        image: image,
        desc: desc
    }, function (err, campground) {
        if (err) {
            console.log("something went wrong!");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new",function (req,res) {
    res.render("new");
});

app.get("/campgrounds/:id",function (req,res) {
    var id=req.params.id;
    // console.log(id);
    var requestedCampground=Campground.findById(id,function (err, requestedCampground) {
        res.render("show", { campground: requestedCampground });
    }); 
});

app.listen('3000',function () {
    console.log("yelp camp server started!");
})

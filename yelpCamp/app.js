const   express     =require('express'),
        app         =express(),
        bodyParser  =require('body-parser'),
        mongoose    =require('mongoose'),
        Campground  =require('./models/campground'),
        Comment     =require('./models/comment'),
        seedsDB     =require('./seeds');

// app config
mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine','ejs');
seedsDB();


// routes 
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

// new route
app.get("/campgrounds/new",function (req,res) {
    res.render("new");
});

// show route
app.get("/campgrounds/:id",function (req,res) {
    // Campground.findOne({_id:req.params.id},function(err,campground) {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(campground);
    //     }
    // });
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", { campground: campground });
            // console.log(campground);
        }
    }); 
});

app.listen('3000',function () {
    console.log("yelp camp server started!");
})

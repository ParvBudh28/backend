var express             =require('express'),
    router              =express.Router(),
    middleware          =require('./../middleware'),
    Campground          =require('../models/campground');

router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("something went wrong");
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// create route
router.post("/",middleware.isLoggedIn, function (req, res) {

    var author={
        id:req.user._id,
        username:req.user.username
    }
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        desc: req.body.description,
        author:author
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
router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// show route
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: campground });
            // console.log(campground);
        }
    });
});

// edit form route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function (req,res) {
    Campground.findById(req.params.id,function (err,foundCamp) {
        if(err){
            res.redirect(back);
        } else{
            res.render("campgrounds/edit",{campground:foundCamp});
        }
    });
});

// actual update route
router.put("/:id",middleware.checkCampgroundOwnership,function (req,res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,campground) {
        if(err){
            console.log(err);
            res.redirect('campgrounds/'+req.params.id);
        } 
        else{
            res.redirect('campgrounds/' + req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership,function (req,res) {
    Campground.findByIdAndRemove(req.params.id,function (err,campground) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }
        else{
            res.redirect('/campgrounds');
        }
    });
});

module.exports=router;
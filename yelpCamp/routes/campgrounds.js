var express             =require('express'),
    router              =express.Router(),
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
router.post("/",isLoggedIn, function (req, res) {

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
router.get("/new",isLoggedIn, function (req, res) {
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports=router;
var express             =require('express'),
    router              =express.Router({mergeParams:true}),
    Comment             =require('./../models/comment'),
    Campground          =require('./../models/campground');


// routes for comments
// new route for comments
router.get("/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// create route for comments
router.post("/", isLoggedIn, function (req, res) {
    console.log("post new comment called");
    Comment.create(req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        }
        else {
            Campground.findById(req.params.id, function (err, campground) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds/" + req.params.id);
                }
                else {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function (err, savedPost) {
                        if (err) {
                            console.log(err);
                        }
                        // console.log(savedPost);
                        res.redirect("/campgrounds/" + req.params.id);
                    });
                }
            });
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
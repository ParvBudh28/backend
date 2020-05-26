var express             =require('express'),
    router              =express.Router({mergeParams:true}),
    Comment             =require('./../models/comment'),
    middleware = require('./../middleware'),
    Campground          =require('./../models/campground');


// routes for comments
// new route for comments
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
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

// edit route for comments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req,res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        }
        else {
            res.render('comments/edit',{comment:foundComment,campground_id:req.params.id});
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, function (req,res) {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err,comment) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds/'+req.params.id);
        }
        else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:comment_id',middleware.checkCommentOwnership,function (req,res) {
    Comment.findByIdAndRemove(req.params.comment_id,function (err,comment) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds/' + req.params.id);
        }   
        else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
}); 

module.exports=router;
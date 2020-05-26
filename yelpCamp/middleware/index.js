var Campground          =require('./../models/campground'),
    Comment             =require('./../models/comment');
var middleware={};

middleware.isLoggedIn =function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

middleware.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
            // if the user is same as the owner
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('/login');
    }
};

middleware.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
            else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect('/login');
    }
};

module.exports=middleware;
var express         =require('express'),
    router          =express.Router(),
    User            =require("../models/user"),
    passport        =require('passport');

// routes 
router.get("/", function (req, res) {
    res.render("landing");
});

// route for sign up
router.get("/register", function (req, res) {
    res.render("signup");
});

router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }
        else {
            passport.authenticate('local')(req, res, function () {
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) { });

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports=router;
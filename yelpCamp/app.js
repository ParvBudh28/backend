const   express         =require('express'),
        app             =express(),
        bodyParser      =require('body-parser'),
        mongoose        =require('mongoose'),
        Campground      =require('./models/campground'),
        Comment         =require('./models/comment'),
        passport        =require('passport'),
        LocalStrategy   =require('passport-local'),
        User            =require('./models/user'),
        session         =require('express-session'),
        seedsDB         =require('./seeds');

// app config
mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set('view engine','ejs');

app.use(session({
    secret:"magic happens here",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
});

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
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
    res.render("campgrounds/new");
});

// show route
app.get("/campgrounds/:id",function (req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", { campground: campground });
            // console.log(campground);
        }
    }); 
});

// routes for comments

// new route for comments
app.get("/campgrounds/:id/comments/new",isLoggedIn,function (req,res) {
    Campground.findById(req.params.id,function (err,campground) {
        if(err){
            console.log(err);
        }   
        else{
            res.render("comments/new",{campground:campground});
        } 
    });
});

// create route for comments
app.post("/campgrounds/:id/comments",isLoggedIn,function (req,res) {
    console.log("post new comment called");
    Comment.create(req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }
        else {
            Campground.findById(req.params.id, function (err, campground) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds/" + req.params.id);
                }
                else {
                    campground.comments.push(comment);
                    campground.save(function (err,savedPost) {
                        if(err){
                            console.log(err);
                        }
                        res.redirect("/campgrounds/" + req.params.id);
                    });
                }
            });
        }
    });
});

// route for sign up
app.get("/register",function (req,res) {
    res.render("signup") ;
});

app.post("/register",function (req,res) {
    User.register(new User({username:req.body.username}),req.body.password,function (err,user) {
        if(err){
            console.log(err);
            return res.redirect('/register');
        } 
        else{
            passport.authenticate('local')(req,res,function () {
                res.redirect("/campgrounds");
            });
        }
    });
});

app.get("/login",function (req,res) {
    res.render("login");
});

app.post("/login",passport.authenticate('local',{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res) {});

app.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/campgrounds");
});

app.get("*",function (req,res) {
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

app.listen('3000',function () {
    console.log("yelp camp server started!");
})

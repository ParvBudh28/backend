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

var campgroundRoutes    =require('./routes/campgrounds'),
    indexRoutes         =require('./routes/index'),
    commentRoutes       =require('./routes/comments');

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

// seedsDB();

app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.get("*", function (req, res) {
    res.redirect("/campgrounds");
});

app.listen('3000',function () {
    console.log("yelp camp server started!");
})

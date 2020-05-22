var express         =require('express'),
    app             =express(),
    mongoose        =require('mongoose'),
    bodyParser      =require('body-parser'),
    Blog            =require('./models/blog'),
    methodOverride  =require('method-override'),
    expressSanitizer=require('express-sanitizer');

// app config
mongoose.connect('mongodb://localhost/blogApp');
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//routes

// index route
app.get("/",function (req,res) {
    res.redirect('/blogs');
});

app.get("/blogs",function (req,res) {
    Blog.find({},function (err,blogs) {
        if(!err){
            res.render('index', { blogs: blogs });
        }
        else{
            console.log(err);
        }
    });
}); 

// new route
app.get("/blogs/new",function (req,res) {
    res.render("new");
});

// create route
app.post("/blogs",function (req,res) {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    var blog_title=req.body.blog.title;
    var blog_body=req.body.blog.body;
    var image=req.body.blog.image;
    Blog.create({
        title:blog_title,
        body:blog_body,
        image:image
    },function (err,addedBlog) {
        if(err){
            res.redirect("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

// show route
app.get("/blogs/:id",function (req,res) {
    Blog.findById(req.params.id,function (err, foundBlog) {
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{blog:foundBlog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function (err,foundBlog) {
        if(err){
            console.log(err);
        }
        else{
            res.render("edit",{blog:foundBlog});
        } 
    });
});

// update route
app.put("/blogs/:id",function (req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function (err,foundBlog) {
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

// delete route
app.delete("/blogs/:id",function (req,res) {
    // delete from the database
    Blog.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.listen(3000,function () {
    console.log("blog server started");
});
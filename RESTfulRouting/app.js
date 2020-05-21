// import all libraries
const   express     =require('express'),
        bodyParser  =require('body-parser'),
        mongoose    =require('mongoose'),
        app=express();
    
// app config
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost/restful_blog_app');

// Mongoose/Model Config
let blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
});

let Blog=mongoose.model('Blog',blogSchema);

// RESTful Routes
app.get("/",function (req,res) {
    res.redirect('/blogs');
});

app.get("/blogs",function (req,res) {
    Blog.find({},function (err,blogs) {
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{blogs:blogs});
        }
    });
});

// app listen
app.listen(3000,function () {
    console.log("server started!");
});

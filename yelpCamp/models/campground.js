var mongoose=require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports= Campground;
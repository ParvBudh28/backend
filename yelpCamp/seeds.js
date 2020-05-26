var mongoose        =require('mongoose'),
    Campground      =require("./models/campground"),
    Comment         =require("./models/comment");

var data=[
    {
        name:"first one",
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=six-camping-tents-in-forest-699558.jpg&fm=jpg",
        desc:"blah blah blah"
    },
    {
        name: "second one",
        image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=photo-of-pitched-dome-tents-overlooking-mountain-ranges-1687845.jpg&fm=jpg",
        desc: "blah blah blah"
    },
    {
        name: "third one",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-surrounded-with-green-grass-field-1061640.jpg&fm=jpg",
        desc: "blah blah blah"
    }
]

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
    //     else {
    //         console.log("removed all campgrounds!");
    //         data.forEach(function (seed) {
    //             Campground.create(seed, function (err, campground) {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 else {
    //                     console.log("added a campground");
    //                     Comment.create({
    //                         text:"this place is great but I wish there was internet!",
    //                         author:"Homer"
    //                     },function (err,comment) {
    //                         if(err){
    //                             console.log(err);
    //                         }
    //                         else{
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("created new comment!");
    //                         }
    //                     });
    //                 };
    //             });
    //         });
    //     }
    });
};

module.exports=seedDB;
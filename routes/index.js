var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB'); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Comment: String
});

var videoSchema = mongoose.Schema({
  VideoName: String,
  Video: String,
})

var Video = mongoose.model('Video',videoSchema);

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); //[1]
  console.log(req.body);
  
	var newcomment = new Comment(req.body); //[3]
 	console.log(newcomment); //[3]
  	newcomment.save(function(err, post) { //[4]
    	if (err) return console.error(err);
    		console.log(post);
    	res.sendStatus(200);
  });
});

/* GET comments from database */
router.get('/comments', function(req, res, next) {
  console.log("In the GET route?");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(commentList); //Otherwise console log the comments you found
	res.json(commentList);      
      
    }
  })
});

router.post('/video', function(req, res, next) {
  console.log("POST video route"); //[1]
  console.log(req.body);
  
  var newVideo = new Video(req.body); //[3]
  console.log(newVideo); //[3]
    newVideo.save(function(err, post) { //[4]
      if (err) return console.error(err);
        console.log(post);
      res.sendStatus(200);
  });
});

router.get('/videos',function(req,res,next){
  console.log("in the Videos Get route");
  Video.find(function(err,videoList){
    if(err) return console.error("ERROR: "+err);
    else {
      console.log(videoList);
      res.json(videoList);
    }
  })

});

module.exports = router;
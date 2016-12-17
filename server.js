var express = require('express');
var PORT = 8080;
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var logger = require('morgan');
var mongoose = require('mongoose');

var Note = require('./models/note.js');
var Article = require('./models/article.js');

var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');

mongoose.Promise = Promise;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

//sets up connection with our mongo db and creates our db/collection
mongoose.connect("mongodb://localhost/MovieReviews");
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose db connection iniated!");
});



//--- routes here ------
app.get('/', function(req, res) {
	res.send(index.html);
});

app.get('/loadHacks', function(req, res) {
	Article.find({}, function(error, doc){
		if (error){
			console.log("find:" + error);
		}
		else {
			res.json(doc)
		}
	});
})

app.get('/getHacks', function(req, res) {
	//scraping lifehacker
	request('http://birthmoviesdeath.com/reviews/', function (error, response, html) {
		var $ = cheerio.load(html);
		$('li').each(function (i, element){
			var article = {};
			article.link = $(this).find('article').find('div').find("a").attr("href");
			article.title = $(this).find('article').find('div').find('p').text();
			article.image = $(this).find('article').find('div').find("header").find("h2").text();
			article.excerpt = $(this).find('article').find('div').find('p').text();

			var entry = new Article(article);

			//saving our articles in MongoDB
			entry.save(function (error, saved) {
				if (error) {
					console.log(error);
				}
				console.log(saved);
			});
		});
	});
	res.redirect('/');
});





//creates a new Note, or replacing the existing one
app.post('/addNote/:id', function () {
	//creates a new Note, and takes the req.body as the note.
	//then save the note

	//then find the article with the adjacent ID, and populate that article with the newNote. 
	//"findOneAndUpdate"
	//then send the note to the page. 

});

//deletes the article's note
app.delete('/delNote/:id', function() {
	//finds article by ID, and then deletes the note. 
	//"findOneAndRemove"
})


// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port: " + PORT);
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
	title: {
		type: String
	},
	excerpt: {
		type: String
	},
	link: {
		type: String
	},
	image: {
		type: String
	}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
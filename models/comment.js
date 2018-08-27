var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
	name: {
		type: String
	},
	comment: {
		type: String,
		require: true
	},
	createdAt: {
		type: Date, 
		default: Date.now
	}
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
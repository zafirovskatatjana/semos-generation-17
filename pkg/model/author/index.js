const mongoose = require("mongoose");

const Author = mongoose.model(
	"author",
	{
		name: { type: String, required: true },
        about: {type: String, required: true },
		yearBorn: { type: String },
		books: [{ type: String, required: true }],
		averageBookRating: {type: Number },
        rating: { type: Number },
	},
	"authorsCollection"
);

module.exports = Author;

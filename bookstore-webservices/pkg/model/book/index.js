const mongoose = require("mongoose");

const Book = mongoose.model(
	"book",
	{
		title: { type: String, required: true },
		author: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		yearWritten: String,
		inventoryCount: { type: Number },
		genre: { type: String, required: true },
        category: [{ type: String, required: true }],
        rating: { type: Number },
        price: { type: Number },
	},
	"booksCollection"
);

module.exports = Book;

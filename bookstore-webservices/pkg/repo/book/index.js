const BookModel = require("../../model/book");

const deleteBook = async (idToFilterBy) => {
	return await BookModel.deleteOne({ _id: idToFilterBy });
};
const updateBook = async (idToFilterBy, newBook) => {
	return await BookModel.updateOne({ _id: idToFilterBy }, newBook);
};
const findBookByID = async (idToFilterBy) => {
	return await BookModel.findById({ _id: idToFilterBy });
};
const findBookByAuthor = async (authorNameToFilterBy) => {
	return await BookModel.findById({ author: authorNameToFilterBy });
};
const findBookByTitle = async (titleToFilterBy) => {
	return await BookModel.findOne({ title: titleToFilterBy });
};
const getAllBooks = async () => {
	return await BookModel.find({});
};
const createBook = async (BookToBeSaved) => {
	const newBook = new BookModel(BookToBeSaved); // creating new instance of BookModel
	return await newBook.save();
};

const updateBookCategory = async (bookId, newCategory) => {
	const bookToBeUpdated = await findBookByID(bookId);
	bookToBeUpdated.category.push(newCategory);
	await updateBook(bookId, bookToBeUpdated);
};

const findBooksByGenre = async (genreToFilterBy) => {
	return await BookModel.find({
		genre: { $in: [genreToFilterBy] },
	}).toArray();
};

const getBooksWithHigherRatingThan = async (rating) => {
	return await BookModel.find({ rating: { $gt: rating } }).toArray();
};

const getBooksWithLowerRatingThan = async (rating) => {
	return await BookModel.find({ rating: { $lt: rating } }).toArray();
};

module.exports = {
	createBook,
	deleteBook,
	updateBook,
	findBookByID,
	getAllBooks,
	findBookByTitle,
	findBookByAuthor,
	updateBookCategory,
    findBooksByGenre,
    getBooksWithHigherRatingThan,
    getBooksWithLowerRatingThan
};

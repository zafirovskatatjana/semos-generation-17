const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const books = require("./handlers");

connectDB();


const { books: { port } } = config.getConfigPropertyValue("services");
const { jwt_secret_key: JWT_SECRET } = config.getConfigPropertyValue("security");

const express = require("express");
const { expressjwt: checkJWTFunction } = require("express-jwt");
const app = express();

app.use(morgan("tiny"));
// parsing the body to be in json format
app.use(express.json());
app.use(
	checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] })
);

app.get('/api/v1/books', booksHandler.getAll);
app.post('/api/v1/book', booksHandler.createNewBook);
app.get('/api/v1/book/:id', booksHandler.getBookById);
app.put('/api/v1/book/:id',  booksHandler.updateBookById);
app.delete('/api/v1/book/:id', booksHandler.removeBook);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Books server running on http://localhost:${port}`);
});

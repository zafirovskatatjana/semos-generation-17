const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const authorsHandler = require("./handlers/index");

connectDB();

const {
	authors: { port },
} = config.getConfigPropertyValue("services");
const { jwt_secret_key: JWT_SECRET } =
	config.getConfigPropertyValue("security");

const express = require("express");
const { expressjwt: checkJWTFunction } = require("express-jwt");
const app = express();

app.use(morgan("tiny"));
// parsing the body to be in json format
app.use(express.json());

app.get("/api/v1/author", (req, res) => {
	res.status(200).send(["call was made from authors"]);
});
// check every request if it has a token
// app.use(checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] }));

app.post(
	"/api/v1/authors",
	checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] }),
	authorsHandler.createNewAuthor
);
app.get("/api/v1/author",checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] }), authorsHandler);
app.get("/api/v1/author/:id", authorsHandler.getById);
app.put("/api/v1/author/:id", authorsHandler.update);
app.delete("/api/v1/author/:id", authorsHandler.delete);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Authors server running on http://localhost:${port}`);
});

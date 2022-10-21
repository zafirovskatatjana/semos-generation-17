const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const authors = require("./handlers");

connectDB();


const { authors: { port } } = config.getConfigPropertyValue("services");
const { jwt_secret_key: JWT_SECRET } = config.getConfigPropertyValue("security");

const express = require("express");
const { expressjwt: checkJWTFunction } = require("express-jwt");
const app = express();

app.use(morgan("tiny"));
// parsing the body to be in json format
app.use(express.json());

app.get('/api/v1/author',(req, res)=> {
	res.status(200).send(['call was made from authors']);
});
app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Authors server running on http://localhost:${port}`);
});

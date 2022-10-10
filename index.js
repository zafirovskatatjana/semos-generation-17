const config = require("./pkg/config");
const connectDB = require("./pkg/database");
const morgan = require("morgan");

connectDB();

const port = config.getConfigPropertyValue("port");

const express = require("express");
const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.send("Zdravo kako si? Poveli 🍦");
});

app.listen(port, (err) => {
	if (err) {
		throw new Error(`Cannot start server running on http://localhost:${port}`, err);
	}

    console.log(`Server running on http://localhost:${port}`)
});

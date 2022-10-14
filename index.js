const config = require("./pkg/config");
const connectDB = require("./pkg/database");
const morgan = require("morgan");
const auth = require("./handlers/auth");

connectDB();

const port = config.getConfigPropertyValue("port");

const express = require("express");
const app = express();

app.use(morgan("tiny"));
// parsing the body to be in json format
app.use(express.json());

app.get("/", async (req, res) => {
	res.send(`🙋‍♂️🙋‍♀️`);
});


// Create endpoints

// login
app.post("/api/v1/auth/login", auth.login);
// logout
app.post("/api/v1/auth/logout", function logoutHandler(request, response) {
	return auth.logout(request, response);
});
// create user credentials / register
app.post("/api/v1/auth/create-user", auth.register);
// forgot password
app.post("/api/v1/auth/forgot-password", auth.forgotPassword);
// reset password
app.post("/api/v1/auth/reset-password", auth.resetPassword);
// refresh token
app.get("/api/v1/auth/refresh-password", auth.refreshToken);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Server running on http://localhost:${port}`);
});

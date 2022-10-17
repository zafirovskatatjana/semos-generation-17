const config = require("./pkg/config");
const connectDB = require("./pkg/database");
const morgan = require("morgan");
const auth = require("./handlers/auth");

connectDB();

const port = config.getConfigPropertyValue("port");
const { jwt_secret_key: JWT_SECRET } =
	config.getConfigPropertyValue("security");

const express = require("express");
const { expressjwt: checkJWTFunction } = require("express-jwt");
const app = express();

app.use(morgan("tiny"));
// parsing the body to be in json format
app.use(express.json());

// CUSTOM MIDDLEWARE METHOD
app.use((request, response, next) => {
	console.log(`but i'm first: ${request.method} - ${response.statusCode}`);
	// request.body = JSON.parse(request.body)
	next();
});

// check every request if it has a token
app.use(
	checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] })
		// don't check if it's using these routes below
		.unless({
			path: [
				"/api/v1/auth/login",
				"/api/v1/auth/logout",
				"/api/v1/auth/create-user",
				"/api/v1/auth/forgot-password",
				"/api/v1/auth/reset-password",
				"/api/v1/auth/refresh-token"
			],
		})
);

app.get("/", async (req, res) => {
	res.send(`🙋‍♂️🙋‍♀️`);
});

app.get("/api/v1/getData", async (req, res) => {
	res.send([
		{ people: `🙋‍♂️🙋‍♀️` },
		{ dogs: "🐕🐕‍🦺🐩" },
		{ fruits: "🍇🍈🍉🍊🍌🥝🍒🍑🍍" },
	]);
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
app.get("/api/v1/auth/refresh-token", auth.refreshToken);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Server running on http://localhost:${port}`);
});

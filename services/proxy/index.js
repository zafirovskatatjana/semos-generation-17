const config = require("../../pkg/config");
const morgan = require("morgan");
const express = require("express");
const expressProxy = require("express-http-proxy");
const app = express();

const {
	proxy: { port },
	authentication: { port: authPort },
	books: { port: booksPort },
	authors: { port: authorsPort },
} = config.getConfigPropertyValue("services");

app.use(morgan("tiny"));

// reroute the request to the auth service
app.use(
	"/api/v1/auth",
	expressProxy(`http://localhost:${authPort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${authPort}/api/v1/auth${request.url}`,
	})
);
// reroute the request to the books service
app.use(
	"/api/v1/books",
	expressProxy(`http://localhost:${booksPort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${booksPort}/api/v1/books${request.url}`,
	})
);
// reroute the request to the author service
app.use(
	"/api/v1/author",
	expressProxy(`http://localhost:${authorsPort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${authorsPort}/api/v1/author${request.url}`,
	})
);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start proxy running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Proxy on http://localhost:${port}`);
});

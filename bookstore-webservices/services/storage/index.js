const config = require("../../pkg/config");
const express = require("express");
const morgan = require("morgan");
const storageHandlers = require("./handlers");
const fileUpload = require('express-fileupload')

const { storage: { port } } = config.getConfigPropertyValue("services");
const { jwt_secret_key: JWT_SECRET } = config.getConfigPropertyValue("security");
const { expressjwt: checkJWTFunction } = require("express-jwt");

const app = express();


/* MIDDLEWARE */
app.use(morgan("tiny"));
app.use(fileUpload())


// app.use(
// 	checkJWTFunction({ secret: JWT_SECRET, algorithms: ["HS256"] })
// );


app.post("/api/v1/storage/files", storageHandlers.uploadFile);
app.get("/api/v1/storage/files", storageHandlers.getFileList);
app.post("/api/v1/storage/files/pdf-file/:filename", storageHandlers.createPDFFile)
app.get("/api/v1/storage/files/:filename", storageHandlers.downloadFile);
app.delete("/api/storage/v1/files/:filename", storageHandlers.removeFile);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Storage server running on http://localhost:${port}`);
});

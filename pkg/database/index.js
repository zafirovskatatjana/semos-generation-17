const config = require("../config");
const mongoose = require("mongoose");

const { username, password, clusterName, databaseName } =
	config.getConfig("dbConfig");

const connectionString = `mongodb+srv://${username}:${password}@${clusterName}/${databaseName}?retryWrites=true&w=majority`;

const connectToDB = async () => {
	try {
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		} 
        // , (err)=> {
        //    console.error(`it went here first ${err}`)
        // }
        );
		console.log("Connected to mongo db");
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectToDB;

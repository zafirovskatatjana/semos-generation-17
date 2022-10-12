const mongoose = require("mongoose");

const Account = mongoose.model(
	"accounts",
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		full_name: String,
		password: { type: String, required: true },
	},
	"accounts"
);

module.exports = Account;

const mongoose = require("mongoose");

const Account = mongoose.model(
	"accounts",
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		full_name: String,
		password: { type: String, required: true },
		firstTimeLogin: { type: Boolean, default: false },
		recoveryState: {type: Boolean, default: false },
		isTwoFactorAuth: Boolean
	},
	"accounts"
);

module.exports = Account;

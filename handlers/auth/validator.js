const { Validator } = require("node-input-validator");

const validateCreateNewAccount = async (requestBody) => {
	const v = new Validator(requestBody, {
		email: "required|email",
		password: "required",
		confirm_password: "required",
	});

	const matched = await v.check();

	if (!matched) {
		throw v.errors;
	}
};

module.exports = validateCreateNewAccount;

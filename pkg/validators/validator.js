const { Validator } = require("node-input-validator");
// RULES TO VALIDATE BY
const validateCreateNewAccountRule = {
	username: "required|string|minLength:3",
	password: "required|string|minLength:3",
	email: "required|email",
};
const validateLoginRule = {
	email: "required|email",
	password: "required|string|minLength:3",
};

const validateCreateNewBookRule = {
	title: "required|string|minLength:3",
	author: "required|string|minLength:3",
	genre: "required|string|minLength:3",
	price: "required|number",
	description: "required|string||minLength:10",
};

const validateCreateNewAuthorRule = {
	name: "required|string|minLength:3",
	about: "required|string|minLength:3",
	books: "required|array"
};

const validateUpdateNewBookForAuthorRule = {
	bookId: "required",
	authorId: "required"
};


// FUNCTION THAT VALIDATES

const validate = async (requestBody, ruleToValidateBy) => {
	const v = new Validator(requestBody, ruleToValidateBy);
	const matched = await v.check();

	if (!matched) {
		throw {
			status: 400,
			message: v.errors
		};
	}
};

module.exports = {
	validate,
	validateCreateNewAccountRule,
	validateLoginRule,
};

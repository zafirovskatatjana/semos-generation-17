

const accountRepo = require('../../pkg/repo/account');
const validateCreateNewAccount = require('./validator');


const BAD_REQUEST_STATUS = 400; // HTTP status
const OK_STATUS = 200; // HTTP status
const CREATED_STATUS = 201; // HTTP status

const login = (request, response) => {

    console.log(request.body);
};
const logout = (request, response) => {};

/**
 * Register handler
 *
 * This is handler method that receives a new object for creating an account
 * 1. First if validates the requests - 
 *     - checks if it's according to the needed values in the schema
 *     - email is in right format
 * 2. Check if password is correct - the password field and repeat password are the same
 * 3. Encodes the password before saving it into the DB
 *
 * @param {*} request 
 * @param {*} response 
 * @returns the status of creating a new account in the system
 */
const register = async ({ body }, response) => {
    try {
        await validateCreateNewAccount(body);
        // accountRepo.createAccount(body)
        return response.status(OK_STATUS).send('👍 nice one m8');
    } catch (err) {
        return response.status(BAD_REQUEST_STATUS).send(err)
    }
};
const refreshToken = (request, response) => {};
const forgotPassword = (request, response) => {};
const resetPassword = (request, response) => {};

module.exports = {
    login,
    logout,
    register,
    refreshToken,
    forgotPassword,
    resetPassword
}
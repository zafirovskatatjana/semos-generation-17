

const accountRepo = require('../../pkg/repo/account');
const bcrypt = require('bcryptjs');

const {validate, validateCreateNewAccountRule, validateLoginRule} = require('./validator');


const BAD_REQUEST_STATUS = 400; // HTTP status
const NOT_FOUND_STATUS = 404; // HTTP status
const OK_STATUS = 200; // HTTP status
const CREATED_STATUS = 201; // HTTP status

const login = async (request, response) => {
    try {
        // validate the request body
        await validate(request.body, validateLoginRule);
        
        // VALIDATION PASSED, NOW WE CAN CONTINUE
        let account = await accountRepo.findAccountByEmail(request.body.email);
        
        // check if the account exists
        if (account == null) {
            throw {
                status: NOT_FOUND_STATUS,
                message: 'User not found'
            };
        } 
        // check if the password sent is equal to the password in saved in DB
        if (!bcrypt.compareSync(request.body.password, account.password)) {
            throw {
                status: BAD_REQUEST_STATUS,
                message: `Passwords don't match`
            }
        }
        

        return response.status(OK_STATUS).send(`Bravo you've logged in!`);
    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
    }
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
        // validate the request body
        await validate(body, validateCreateNewAccountRule);
        
        // VALIDATION PASSED, NOW WE CAN CONTINUE
        let account = await accountRepo.findAccountByEmail(body.email);

        // check if it exists
        if (account != null) {
            throw {
                status: BAD_REQUEST_STATUS,
                message: 'User already exists'
            };
        }

        // encode the password so it's safely stored in db
        body.password = bcrypt.hashSync(body.password);

        let result = await accountRepo.createAccount(body);

        return response.status(CREATED_STATUS).send('User successfully created!');
    } catch (err) {
        // return the bad request when we have an error
        return response.status(err.status).send(err.message);
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
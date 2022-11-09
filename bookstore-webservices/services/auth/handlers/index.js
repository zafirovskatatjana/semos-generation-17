

const accountRepo = require('../../../pkg/repo/account');
const config = require('../../../pkg/config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {validate, validateCreateNewAccountRule, validateLoginRule} = require('../../../pkg/validators/validator');
const { jwt_secret_key: JWT_SECRET, expiryTime } = config.getConfigPropertyValue("security");


const MILISECONDS = 1000;
const ONE_SECOND = 1; // in seconds
const ONE_MINUTE = 60; // in seconds
const ONE_HOUR = ONE_MINUTE * 60; // in minutes
const ONE_DAY = ONE_HOUR * 24; // in hours
// default to 1d expiration of token if it's not set in the config

const timePeriodDictionary = {
    'd': ONE_DAY,
    'm': ONE_MINUTE,
    's': ONE_SECOND,
    'h': ONE_HOUR
}

const calculateExpiryTime = () => {
    const timePeriod = timePeriodDictionary[expiryTime.charAt(expiryTime.length - 1)];
    const numberOfTime = expiryTime.substring(0, expiryTime.length - 1); // TODO: change bad name
    return timePeriod * numberOfTime;
}
const TIME_TO_LIVE = expiryTime != null ? calculateExpiryTime() : ONE_DAY;

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
        
        const payloadData = {
            username: account.username,
            email: account.email,
            exp: getExpiryDateForToken()
        };

        const encodedToken = jwt.sign(payloadData, JWT_SECRET);
        return response.status(OK_STATUS).send({ token: encodedToken });

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
const forgotPassword = (request, response) => {

    // 1. validate if we have correct data
    //      1.1 email and username are send to the end-point
    // 2. validate/check in is the user created in our DB. 
    //      2.1 If he exists in our system, then proceed, else throw error
    // 3. Compose email with a safe temporary URL on with the user can enter new password
    //      3.2 Update the recovery status of that user name
    //     3.1 Create dynamic endpoint to host the form temporarily

};

const recoverPassword = (request, response) => {
    // 4. Expect the newly create password from the endpoint
    //   4.1 Validate is is for the same username we send the email in the first place
    //   4.2 Validate token send if it's not expired
    // 5. Save new password it into DB
    // 6. Set recovery status for to false
}
const resetPassword = (request, response) => {};


const getExpiryDateForToken = () => Math.floor(new Date().getTime() / MILISECONDS + TIME_TO_LIVE);

module.exports = {
    login,
    logout,
    register,
    refreshToken,
    forgotPassword,
    resetPassword
}
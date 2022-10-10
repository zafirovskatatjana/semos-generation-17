const mongoose = require("mongoose");

const Account = mongoose.model("accounts", {
    username: String,
    email: String,
    full_name: String,
    password: String
}, "accounts");


module.exports = Account;
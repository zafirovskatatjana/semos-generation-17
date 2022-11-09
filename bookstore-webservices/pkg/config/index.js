const fs = require('fs');

const configPath = `${__dirname}../../../config.json`;
// const configPath = `C://cdimeski/SEMOS/Workeare/generacija17`;
// const configPath = `root/blablavla/dsladsa`;


// get the data from the file system
const configDataFromFileSystem = fs.readFileSync(configPath);


// convert the string into a JSON object
const config = JSON.parse(configDataFromFileSystem);

// returns the config for the specified property we send
const getConfigPropertyValue = (key) => {
    // check whether the object has the property we want
    // if (config.hasOwnProperty(key)) { // => true/false check
    //     return config[key];
    // }
    // throw(new Error('Requested property is not present in config object.'))

    // if (!config.hasOwnProperty(key)) { // => true/false check
    //     throw(new Error('Requested property is not present in config object.'));
    //     // return null;
    // }

    if(config[key] === undefined) {
        throw(new Error('Requested property is not present in config object.'));
    }
    return config[key];
};

module.exports = {
    getConfigPropertyValue
}
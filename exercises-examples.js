// ----- extracting object properties dynamically

const object = {
	testProp: 1,
	testPro1: true,
};
const propertyName = "testProp";
console.log(object[propertyName]);

// ----- values of null and undefined

console.log(undefined == null);
console.log(false == false);

// ----- filter function and criteria we send (item) => Item>9 is the predicate upon which we filter

console.log([1, 24, 56, 7, 4, 8, 8, 5, 43, 2].filter((item) => item > 9));

// ----- constructor and class declarations
class Account {
	userName; // internal to the class
	password; // internal to the class
	constructor(usernameToBeSaved, passwordToBeSaved) {
		// coming outside of the class
		this.userName = usernameToBeSaved;
		this.password = passwordToBeSaved;
	}
}

const account = new Account("testName", "test");
const account1 = new Account("testName1", "test1");

console.log(account.password);
console.log(account1.password);

// ----- Context of functions
function delay(string, callback) {
	console.log(string);
	setTimeout(() => {
		callback("1000");
	}, 1000);
}

this.globalThis = "hyoooo";

function parentFunction() {
	this.test = "hello";

	delay("test", () => {
		console.log(this.globalThis);
	});
}
console.log(this);
console.log(this.globalThis);

parentFunction();

// Implicitly return an object from an arrow function
const testy = { test: 1 };
const returnObject = () => ({ test: 1 });

console.log(returnObject());

// PROMISES SECTION
console.log("first");
function getDataFromDBOne(callbackFunctionReference) {
	let result = "";
	setTimeout(() => {
		result = "Result from DBOne is here"; //  the call from DB has resolved
		callbackFunctionReference(result);
	}, 5000);
}
function getDataFromDBTwo(callbackFunctionReference) {
	let result = "";
	setTimeout(() => {
		result = "Result from DBTwo is here"; //  the call from DB has resolved
		callbackFunctionReference(result);
	}, 2000);
}

function printAfterYouGetResult(result, callbackFunctionReference) {
	setTimeout(() => {
		console.log("this only happens after ", result);
		let ammount = 12;

		callbackFunctionReference(ammount);
	}, 3000);
}

// getDataFromDBOne((resultFromCallback) => {
//  console.log("dataOne ", resultFromCallback);
//  printAfterYouGetResult(resultFromCallback, (resultAmount) => {
//   console.log("result ", resultAmount);
//  })
// });

// getDataFromDBTwo((resultFromCallback) => {
//  console.log('data Two ', resultFromCallback);
// });

//

const uslov = true;
let promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log("promise is executing");
		if (uslov) {
			resolve("result from promise");
		}
		reject(new Error("did not execute"));
	}, 3000);
});

promise
	.then((result) => {
		console.log(result);
		if (result == "result from promise") {
			return 12;
		}
	})
	.then((result) => console.log("another result ", result))
	.catch((error) => {
		console.error(error);
	});

async function executeAsync() {
	const result = await promise;
	console.log(result);
	if (result != "result from promise") {
		throw new Error("this has to be executed");
	}
}

try {
	executeAsync();
} catch (error) {
	console.log(error);
}


// custom expiry logic playground code

// const expiryTime = '1d';
const expiryTime = '21d';
// const expiryTime = '3s';
// const expiryTime = '5h';
const MILISECONDS = 1000;
const ONE_SECOND = 1; // in seconds
const ONE_MINUTE = 60; // in seconds
const ONE_HOUR = ONE_MINUTE * 60; // in minutes
const ONE_DAY = ONE_HOUR * 24; // in hours

const timeDictionary = {
    'd': ONE_DAY,
    'm': ONE_MINUTE,
    's': ONE_SECOND,
    'h': ONE_HOUR
}

function calculateExpiryTime() {
    const time = timeDictionary[expiryTime.charAt(expiryTime.length - 1)];
    const number = expiryTime.substring(0, expiryTime.length - 1);
    return time * number;
}

console.log(calculateExpiryTime())
// console.log(expiryTime.length)

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


let array = [1, 1, 2, 3, 4, 5, 67, 2, 222, 2, 222];
const non_duplicate = [];

// BRUTE FORCE SOLUTION
// 0. create non-duplicate array
// 1. push one element onto none-duplicate array
// 2. go to the next element
// 3. check if it's already in the none-duplicate array
// 3.1 if it is -> to the next element
// 3.2 if it's not -> add it to the none-duplicate array;

// BRUTE FORCE
// array.forEach((item, index, array)=> {
//     if(index == 0) {
//         non_duplicate.push(item);
//     }
//     if(non_duplicate.includes(item)) {
//         // no-op
//     } else {
//         non_duplicate.push(item)
//     }
// });

// OPTIMIZE # 1
// array.forEach((item, index, array)=> {
//     if(index == 0) {
//         non_duplicate.push(item);
//     }
//     if(!non_duplicate.includes(item)) {
//         non_duplicate.push(item)
//     }
// });

// OPTIMIZE #2
// array.forEach((item, index, array)=> {
//     if(!non_duplicate.includes(item)) {
//         non_duplicate.push(item)
//     }
// });

// OPTIMIZE #3
array.forEach((item, index, array) => {
	if (!non_duplicate.includes(item)) {
		non_duplicate.push(item);
	}
});
// use instead Set which is a data structure that does not hold duplicates
array = [...new Set(array)];

const set = new Set([1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 33, 3, 3, 3, 3, 2, 3, 4]);
const arrayFromTheSet = Array.from(set);
const oneArray = [1, "1e21", true];
const newArray = [...oneArray];

// using spread operator to cut back the code from this bellow
set.forEach((item) => newArray.push(item));
            // const arrayOfTheSet = Array.of(set); NOT GOOD
            //1    x  ✅  ! !  !  !   !   !  !    !
            //2          x  !  !  !   !  ✅ !    ✅
            //3             x  !  !   !  !   !   !   !
            //4               x  !   !  !  !    !  !
            // 5                  x  !   !  !     !   !
            // 67                     x   !   !   !   !
            // 222                           x    !  ✅
            //   2                               x
console.log(array);
console.log(non_duplicate);
console.log(set);
console.log(arrayFromTheSet);
console.log(newArray);
// console.log(arrayOfTheSet) NOT GOOD

                    //  xx xx
const palindromeWord = "kayak";

// quick JS trick
console.log(palindromeWord == palindromeWord.split("").reverse().join(""));
// but what the interview would really like to see
console.log(isPalindrome(palindromeWord));

function isPalindrome(word) {
	let stack = [];
	for (let i = 0; i < word.length; i++) {
		stack.push(word[i]);
	}
	let reversedWord = "";
	for (let i = 0; i < word.length; i++) {
		reversedWord += stack.pop();
	}
	return word == reversedWord;
}



// ----- extracting object properties dynamically

const object = {
    testProp: 1,
    testPro1: true
}
const propertyName = 'testProp';
console.log(object[propertyName])


// ----- values of null and undefined

console.log(undefined == null)
console.log(false == false)


// ----- filter function and criteria we send (item) => Item>9 is the predicate upon which we filter

console.log([1,24,56,7,4,8,8,5,43,2].filter(item => (item > 9)) );

// ----- constructor and class declarations
class Account {
    userName; // internal to the class
    password // internal to the class
    constructor(usernameToBeSaved, passwordToBeSaved) { // coming outside of the class
        this.userName = usernameToBeSaved;
        this.password = passwordToBeSaved
    }
}


const account = new Account('testName', 'test');
const account1 = new Account('testName1', 'test1');

console.log(account.password)
console.log(account1.password)


// ----- Context of functions
function delay(string, callback) {
    console.log(string)
    setTimeout(()=> {
        callback('1000');
    }, 1000)
}


this.globalThis = 'hyoooo';

function parentFunction() {
    this.test = 'hello';

    delay('test', () => {
        console.log(this.globalThis)
    });
}
console.log(this)
console.log(this.globalThis)

parentFunction()
"use strict"
function myClone(obj) {
    let clone = {};
    for(let x in obj) {
        if({}.toString.call(obj[obj[x]]) === '[object Object]'){
            clone[x] = myClone(obj[x]);
        }else {
            clone[x] = obj[x];
        }
    }
    return clone;
}
let testObj = {
    name : "Ashutosh",
    brother: {
        name : "Shyam",
    },
    address: {
        city: {
            name: 'delhi',
        }
    }
}
console.log(myClone(testObj));

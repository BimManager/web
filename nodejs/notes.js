let x0 = new Object(); // {}
let x1 = new String(); // ""
let x2 = new Number(); // 0
let x3 = new Boolean(); // false
let x4 = new Array(); // []
let x5 = new RegExp(); // /()/
let x6 = new Function(); // function() {};
let x7 = new Date();

Object.prototype.fortyTwo = function() { return 42; }

let date = new Date();
console.log(date.fortyTwo());




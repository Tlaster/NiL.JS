/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-354-6.js
 * @description Object.defineProperty - Indexed property 'P' with attributes [[Writable]]: false, [[Enumerable]]: true, [[Configurable]]: true is non-writable using simple assignment, 'A' is an Array object
 */


function testcase() {
        var obj = [];

        Object.defineProperty(obj, "0", {
            value: 2010,
            writable: false,
            enumerable: true,
            configurable: true
        });
        var verifyValue = (obj[0] === 2010);
        obj[0] = 1001;

        return verifyValue && obj[0] === 2010;
    }
runTestCase(testcase);

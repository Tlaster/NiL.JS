/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-a-15.js
 * @description Array.prototype.lastIndexOf -  deleting own property with prototype property causes prototype index property to be visited on an Array-like object
 */


function testcase() {

        var arr = { 0: 0, 1: 111, 2: 2, length: 10 };
        
        Object.defineProperty(arr, "6", {
            get: function () {
                delete arr[1];
                return 0;
            },
            configurable: true
        });

        try {
            Object.prototype[1] = 1;
            return 1 === Array.prototype.lastIndexOf.call(arr, 1);
        } finally {
            delete Object.prototype[1];
        }
    }
runTestCase(testcase);

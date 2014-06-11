/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-a-14.js
 * @description Array.prototype.indexOf - deleting property of prototype causes prototype index property not to be visited on an Array
 */


function testcase() {

        var arr = [0, , 2];

        Object.defineProperty(arr, "0", {
            get: function () {
                delete Array.prototype[1];
                return 0;
            },
            configurable: true
        });

        try {
            Array.prototype[1] = 1;
            return -1 === arr.indexOf(1);
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);

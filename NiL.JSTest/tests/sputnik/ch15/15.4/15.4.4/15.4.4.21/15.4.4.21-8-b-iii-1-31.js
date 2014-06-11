/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-8-b-iii-1-31.js
 * @description Array.prototype.reduce - element changed by getter on current iterations is observed in subsequent iterations on an Array-like object
 */


function testcase() {

        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (curVal === 1);
            }
        }

        var obj = { length: 2 };
        var preIterVisible = false;

        Object.defineProperty(obj, "0", {
            get: function () {
                preIterVisible = true;
                return 0;
            },
            configurable: true
        });

        Object.defineProperty(obj, "1", {
            get: function () {
                if (preIterVisible) {
                    return 1;
                } else {
                    return 100;
                }
            },
            configurable: true
        });

        Array.prototype.reduce.call(obj, callbackfn);
        return testResult;

    }
runTestCase(testcase);

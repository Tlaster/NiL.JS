/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-2-12.js
 * @description Array.prototype.map - applied to the Array-like object when 'length' is own accessor property without a get function that overrides an inherited accessor property
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return val > 10;
        }

        try {
            Object.defineProperty(Object.prototype, "length", {
                get: function () {
                    return 2;
                },
                configurable: true
            });

            var obj = { 0: 12, 1: 11 };
            Object.defineProperty(obj, "length", {
                set: function () { },
                configurable: true
            });

            var testResult = Array.prototype.map.call(obj, callbackfn);
            return testResult.length === 0;
        } finally {
            delete Object.prototype.length;
        }
    }
runTestCase(testcase);

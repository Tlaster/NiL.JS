/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-376.js
 * @description ES5 Attributes - property ([[Writable]] is false, [[Enumerable]] is false, [[Configurable]] is false) is non-enumerable
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "prop", {
            value: 2010,
            writable: false,
            enumerable: false,
            configurable: false
        });
        var propertyDefineCorrect = obj.hasOwnProperty("prop");
        var desc = Object.getOwnPropertyDescriptor(obj, "prop");
        for (var p in obj) {
            if (p === "prop") {
                return false;
            }
        }
        return propertyDefineCorrect && desc.enumerable === false;
    }
runTestCase(testcase);

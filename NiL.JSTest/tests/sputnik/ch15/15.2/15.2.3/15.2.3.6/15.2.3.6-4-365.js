/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-365.js
 * @description ES5 Attributes - fail to update [[Enumerable]] attribute of data property ([[Writable]] is false, [[Enumerable]] is true, [[Configurable]] is false) to different value
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "prop", {
            value: 2010,
            writable: false,
            enumerable: true,
            configurable: false
        });
        var propertyDefineCorrect = obj.hasOwnProperty("prop");
        var desc1 = Object.getOwnPropertyDescriptor(obj, "prop");
        try {
            Object.defineProperty(obj, "prop", {
                enumerable: false
            });

            return false;
        } catch (e) {
            var desc2 = Object.getOwnPropertyDescriptor(obj, "prop");

            return propertyDefineCorrect && desc1.enumerable === true && obj.prop === 2010 && desc2.enumerable === true && e instanceof TypeError;
        }
    }
runTestCase(testcase);

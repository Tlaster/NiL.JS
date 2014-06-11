/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-223.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index property, test TypeError is thrown  when the [[Value]] field of 'desc' and the [[Value]] attribute value of 'name' are two strings with different values (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];

        Object.defineProperty(arrObj, 0, {
            value: "abcd",
            writable: false,
            configurable: false
        });

        try {
            Object.defineProperty(arrObj, "0", { value: "fghj" });
            return false;
        } catch (e) {
            return e instanceof TypeError && dataPropertyAttributesAreCorrect(arrObj, "0", "abcd", false, false, false);
        }
    }
runTestCase(testcase);

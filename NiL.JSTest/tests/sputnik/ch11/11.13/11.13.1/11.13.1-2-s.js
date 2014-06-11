/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch11/11.13/11.13.1/11.13.1-2-s.js
 * @description Strict Mode - TypeError is thrown if The LeftHandSide is a reference to an accessor property with the attribute value {[[Set]]:undefined} under strict mode
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var obj = {};
        Object.defineProperty(obj, "prop", {
            get: function () {
                return 11;
            },
            set: undefined,
            enumerable: true,
            configurable: true
        });

        try {
            obj.prop = 20;
            return false;
        } catch (e) {
            return e instanceof TypeError && obj.prop === 11;
        }
    }
runTestCase(testcase);

/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-279.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is generic own accessor property of 'O', and 'desc' is accessor descriptor, test updating multiple attribute values of 'name' (15.4.5.1 step 5)
 */


function testcase() {

        var arrObj = [];

        function getFunc() {
            return 12;
        }
        function setFunc(value) {
            arrObj.setVerifyHelpProp = value;
        }
        Object.defineProperty(arrObj, "property", {
            get: function () {
                return 24;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(arrObj, "property", {
            get: getFunc,
            set: setFunc,
            enumerable: false,
            configurable: false
        });

        return accessorPropertyAttributesAreCorrect(arrObj, "property", getFunc, setFunc, "setVerifyHelpProp", false, false);
    }
runTestCase(testcase);

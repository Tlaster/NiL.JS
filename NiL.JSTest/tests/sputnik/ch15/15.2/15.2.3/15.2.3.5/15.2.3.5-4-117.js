/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-117.js
 * @description Object.create - one property in 'Properties' is the Math object that uses Object's [[Get]] method to access the 'configurable' property (8.10.5 step 4.a)
 */


function testcase() {

        try {
            Math.configurable = true;

            var newObj = Object.create({}, {
                prop: Math
            });

            var result1 = newObj.hasOwnProperty("prop");
            delete newObj.prop;
            var result2 = newObj.hasOwnProperty("prop");

            return result1 === true && result2 === false;
        } finally {
            delete Math.configurable;
        }
    }
runTestCase(testcase);

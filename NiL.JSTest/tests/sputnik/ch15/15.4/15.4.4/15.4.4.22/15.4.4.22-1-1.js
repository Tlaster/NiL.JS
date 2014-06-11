/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-1-1.js
 * @description Array.prototype.reduceRight applied to undefined throws a TypeError
 */


function testcase() {
        try {
            Array.prototype.reduceRight.call(undefined); 
            return false;
        } catch (e) {
            return (e instanceof TypeError);
        }
    }
runTestCase(testcase);

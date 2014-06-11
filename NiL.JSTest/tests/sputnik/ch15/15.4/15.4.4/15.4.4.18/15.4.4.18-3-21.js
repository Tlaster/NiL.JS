/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-3-21.js
 * @description Array.prototype.forEach - 'length' is an object that has an own valueOf method that returns an object and toString method that returns a string
 */


function testcase() {

        var testResult = false;
        var firstStepOccured = false;
        var secondStepOccured = false;

        function callbackfn(val, idx, obj) {
            testResult = (val > 10);
        }

        var obj = {
            1: 11,
            2: 9,
            length: {
                valueOf: function () {
                    firstStepOccured = true;
                    return {};
                },
                toString: function () {
                    secondStepOccured = true;
                    return '2';
                }
            }
        };

        Array.prototype.forEach.call(obj, callbackfn);

        return testResult && firstStepOccured && secondStepOccured;
    }
runTestCase(testcase);

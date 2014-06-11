/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-238.js
 * @description Object.defineProperty - 'set' property in 'Attributes' is an inherited data property (8.10.5 step 8.a)
 */


function testcase() {
        var obj = {};
        var data = "data";
        var proto = {
            set: function (value) {
                data = value;
            }
        };

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();

        Object.defineProperty(obj, "property", child);

        obj.property = "overrideData";

        return obj.hasOwnProperty("property") && data === "overrideData";
    }
runTestCase(testcase);

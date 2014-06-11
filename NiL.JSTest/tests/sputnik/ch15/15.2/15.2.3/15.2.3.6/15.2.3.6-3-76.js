/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-76.js
 * @description Object.defineProperty - 'configurable' property in 'Attributes' is an inherited data property (8.10.5 step 4.a)
 */


function testcase() {
        var obj = { };

        var proto = {
            configurable: false
        };

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();

        Object.defineProperty(obj, "property", child);

        var beforeDeleted = obj.hasOwnProperty("property");

        delete obj.property;

        var afterDeleted = obj.hasOwnProperty("property");
        return beforeDeleted && afterDeleted && typeof (obj.property) === "undefined";
    }
runTestCase(testcase);

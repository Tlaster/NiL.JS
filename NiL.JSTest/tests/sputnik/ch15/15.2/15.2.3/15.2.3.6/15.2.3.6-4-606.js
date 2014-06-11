/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-606.js
 * @description ES5 Attributes - all attributes in Object.preventExtensions are correct
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Object, "preventExtensions");

        var propertyAreCorrect = (desc.writable === true && desc.enumerable === false && desc.configurable === true);

        var temp = Object.preventExtensions;

        try {
            Object.preventExtensions = "2010";

            var isWritable = (Object.preventExtensions === "2010");

            var isEnumerable = false;

            for (var prop in Object) {
                if (prop === "preventExtensions") {
                    isEnumerable = true;
                }
            }
        
            delete Object.preventExtensions;

            var isConfigurable = !Object.hasOwnProperty("preventExtensions");

            return propertyAreCorrect && isWritable && !isEnumerable && isConfigurable;
        } finally {
            Object.defineProperty(Object, "preventExtensions", {
                value: temp,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
runTestCase(testcase);

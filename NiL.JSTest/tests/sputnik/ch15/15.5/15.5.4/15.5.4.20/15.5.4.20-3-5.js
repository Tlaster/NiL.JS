/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-3-5.js
 * @description String.prototype.trim - 'S' is a string end with union of all LineTerminator and all WhiteSpace
 */


function testcase() {
        var lineTerminatorsStr = "\u000A\u000D\u2028\u2029";
        var whiteSpacesStr = "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF";
        var str = "abc" + whiteSpacesStr + lineTerminatorsStr ;

        return (str.trim() === "abc");
    }
runTestCase(testcase);

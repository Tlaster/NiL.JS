/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-90-s.js
 * @description Strict Mode - checking 'this' (non-strict function declaration called by strict Function.prototype.call())
 * @noStrict
 */
    
function testcase() {
function f() { return this===fnGlobalObject();};
return (function () {"use strict"; return f.call(); })();
}
runTestCase(testcase);
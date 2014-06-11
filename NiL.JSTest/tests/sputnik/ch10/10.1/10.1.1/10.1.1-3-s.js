/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch10/10.1/10.1.1/10.1.1-3-s.js
 * @description Strict Mode - Use Strict Directive Prologue is '' use strict';' which the first character is space
 * @noStrict
 */


function testcase() {
        " use strict";
        var public = 1;

        return public === 1;
    }
runTestCase(testcase);

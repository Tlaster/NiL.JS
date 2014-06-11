// Copyright 2009 the Sputnik authors.  All rights reserved.
/**
 * The [[Prototype]] property of the newly constructed object
 * is set to the original Array prototype object, the one that
 * is the initial value of Array.prototype
 *
 * @path ch15/15.4/15.4.2/15.4.2.1/S15.4.2.1_A1.1_T3.js
 * @description Checking use isPrototypeOf
 */

//CHECK#1
if (Array.prototype.isPrototypeOf(new Array()) !== true) {
  $ERROR('#1: Array.prototype.isPrototypeOf(new Array()) === true. Actual: ' + (Array.prototype.isPrototypeOf(new Array())));
}



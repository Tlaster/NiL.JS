// Copyright 2009 the Sputnik authors.  All rights reserved.
/**
 * The Date.prototype property "toLocaleTimeString" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.7/S15.9.5.7_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.prototype.toLocaleTimeString  === false) {
  $ERROR('#1: The Date.prototype.toLocaleTimeString property has not the attributes DontDelete');
}

if (Date.prototype.hasOwnProperty('toLocaleTimeString')) {
  $FAIL('#2: The Date.prototype.toLocaleTimeString property has not the attributes DontDelete');
}



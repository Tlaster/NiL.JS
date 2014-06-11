// Copyright 2009 the Sputnik authors.  All rights reserved.
/**
 * The Date.prototype.toLocaleString property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.5/S15.9.5.5_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.toLocaleString.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.toLocaleString.length property has the attribute DontEnum');
}

for(x in Date.prototype.toLocaleString) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.toLocaleString.length has the attribute DontEnum');
  }
}



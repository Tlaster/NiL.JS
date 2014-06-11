/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch11/11.4/11.4.1/11.4.1-3-2.js
 * @description delete operator throws ReferenceError when deleting an explicitly qualified yet unresolvable reference (base obj undefined)
 */


function testcase() {
  // just cooking up a long/veryLikely unique name
  try
  {
    var d = delete __ES3_1_test_suite_test_11_4_1_3_unique_id_2__.x;
  }
  catch(e)
  {
    if (e instanceof ReferenceError)
      return true;
  }
 }
runTestCase(testcase);

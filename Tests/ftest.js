function* gen() { yield "first"; yield "" + (yield "second"); }

for (var g of gen()) { console.log(g); }
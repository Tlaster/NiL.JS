function f(char, count) {
    var r = "";
    while (count-- > 0)
        r += char;
    return r + (char < 10 ? f(++char, 3) : "");
}

console.log(f(1, 3));
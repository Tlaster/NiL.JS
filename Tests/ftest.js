function test(x) {
	return () => this.value;
}

console.log(test.call({ value: 'hello' })());
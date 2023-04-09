function memoizeFib(fib: (n: number) => number): (n: number) => number {
  const cache = new Map<number, number>();

  return (n: number): number => {
    if (cache.has(n)) {
      return cache.get(n)!;
    }

    const result = fib(n);
    cache.set(n, result);
    return result;
  };
}

const fib = memoizeFib((n: number): number => {
  if (n <= 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
});

console.log(fib(10)); // 55
console.log(fib(20)); // 6765
console.log(fib(30)); // 832040
console.log(fib(40)); // 102334155
console.log(fib(50)); // 12586269025

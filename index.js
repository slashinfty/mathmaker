function factors(n) {
    let a = [1, n];
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % i === 0) a = [...a, i, n / i];
    }
    return [...new Set(a)].sort((x, y) => x - y);
}

function gcd(a) {
    const f = a.map(n => factors(n));
    const g = f.reduce((i, x) => i.filter(z => x.includes(z)), f[0]);
    return Math.max(...g);
}

function lcm(a) {
    const m = Math.max(...a);
    let i = 1;
    do {
        let x = m * i;
        if (a.filter(v => x % v !== 0).length === 0) return x;
        i++;
    } while (true);
}

function sqrt(n) {
    if (Number.isInteger(Math.sqrt(n))) return [Math.sqrt(n), 1];
    let s = Math.floor(Math.sqrt(n / 2));
    do {
        if (n % Math.pow(s, 2) === 0) return [s, n / Math.pow(s, 2)];
        s--;
    } while (s > 0);
    return [1, n];
}
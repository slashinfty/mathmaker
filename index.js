// MathJax initialization
MathJax = {
    tex: {
        inlineMath: [
            ['$', '$']
        ]
    }
}

// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
}

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
    if (Number.isInteger(Math.sqrt(n))) return `${Math.sqrt(n)}`;
    let s = Math.floor(Math.sqrt(n / 2));
    do {
        if (n % Math.pow(s, 2) === 0) return `${s}\sqrt{${n / Math.pow(s, 2)}}`;
        s--;
    } while (s > 0);
    return `\sqrt{${n}}`;
}

function frac(n, d) {
    if (n % d === 0) return `${n / d}`;
    return `${(n > 0 && d < 0) || (n < 0 && d > 0) ? '-' : ''}\dfrac{${Math.abs(n / gcd([n, d]))}}{${Math.abs(d / gcd([n, d]))}}`;
}

// Add question
function question(element, question, solution) {
    // use a class name to denote active question
    
    // find old element, if it exists
    // remove inner html and class
    // add class to new element
    // add question, solution, and link to show solution
}

// Generators
document.querySelector('#quadratic').addEventListener('click', () => {
    const type = Number(document.querySelector('input[name="quadratic-type"]:checked').value);
    if (type < 3) {
        const [p, q] = [randomInt(-15, 15), randomInt(-15, 15)];
        const [r, s] = [type === 2 ? randomInt(1, 4) : 1, type === 2 ? randomInt(1, 4) : 1];
        const [a, b, c, d] = [r / gcd([r, p]), p / gcd([r, p]), s / gcd([s, q]), q / gcd([s, q])];
        let [h, k] = [1, 1];
        if (document.querySelector('quadratic-larger').checked) {
            k = randomInt(1, 6);
            if (type === 2) h = randomInt(1, 6);
        }
        const g = document.querySelector('quadratic-gcf').checked ? randomInt(1, 12) : 1;
        const [x, y, z] = [a * c * g * Math.pow(h, 2), -1 * g * (a * d * h * k + b * c * h * k), b * d * g * Math.pow(k, 2)];
        question(
            document.querySelector('#quadratic-placement'),
            `$$${x}x^2${y > 0 ? '+' : ''}${y === 0 ? '' : `${y}x`}${z > 0 ? '+' : ''}${z === 0 ? '' : z}=0$$`,
            `$$x=${frac(k * b, a * h)},x=${frac(k * d, c * h)}$$`
        );
    } else {

    }
});
const fs = require('fs');

//string[]
const generateCombinations = (items, length) => {
    if (length === 1) return items;
    const combinations = [];
    items.forEach((item, index) => {
        const smallerCombinations = generateCombinations(items.slice(index + 1), length - 1);
        smallerCombinations.forEach(smallerCombination => {
            combinations.push(item + smallerCombination);
        });
    });
    return combinations;
};

const line = (code, id, x1, y1, x2, y2) => {
    return code.indexOf(id) >= 0 ?
        `<line x1="${x1 * 10}" y1="${y1 * 10}" x2="${x2 * 10}" y2="${y2 * 10}" stroke="black" strokeWidth="8" />`
        : null;
}

const generateSvgContent = (code, showCode) => {

    const elements = [
        line(code, 'n', 0, 0, 1, 0),
        line(code, "m", 1, 0, 2, 0),
        line(code, "b", 0, 0, 0, 1),
        line(code, "e", 1, 0, 1, 1),
        line(code, "d", 2, 0, 2, 1),
        line(code, "i", 0, 1, 1, 1),
        line(code, "a", 1, 1, 2, 1),
        line(code, "p", 0, 1, 0, 2),
        line(code, "o", 1, 1, 1, 2),
        line(code, "q", 2, 1, 2, 2),
        line(code, "u", 0, 2, 1, 2),
        line(code, "w", 1, 2, 2, 2)
    ]
        .filter((el) => el !== null);

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            elements.push(
                `<circle cx="${x * 10}" cy="${y * 10}" r="2" fill="black" />`);
        }
    }

    const svgContent = '<svg width="110px" height="110px" viewBox="-5 -5 30 30" xmlns="http://www.w3.org/2000/svg">\n' +
        elements.join('\n') +
        // (showCode ? `\n<text x="0" y="3" fontFamily="SanSerif" fontSize="0.5" fill="black">${code}</text>\n` : '') +
        '</svg>\n';
    return svgContent;
};

const allCombinations = [];
const items = ['n', 'm', 'b', 'e', 'd', 'i', 'a', 'p', 'o', 'q', 'u', 'w'];
for (let i = 1; i <= items.length; i++) {
    allCombinations.push(...generateCombinations(items, i));
}

if (!allCombinations) {
    console.log('No combinations found!');
    return;
}

const startTime = Date.now();
allCombinations.forEach((code) => {
    const content = generateSvgContent(code, true);
    const filename = `grids/${code}.svg`;

    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
const endTime = Date.now();
console.log(`\nElapsed time: ${endTime - startTime} ms\n`);



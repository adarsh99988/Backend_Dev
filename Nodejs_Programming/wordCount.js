const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }

    const wordCount = data.split(/\s+/).filter(Boolean).length;

    fs.writeFile('output.txt', `Word Count: ${wordCount}`, (err) => {
        if (err) console.log(err);
        else console.log("Word count written to output.txt");
    });
});

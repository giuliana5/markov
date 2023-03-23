/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov");

function generateText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
}

function fileText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        generateText(data);
    })
}

async function urlText(url) {
    try {
        let res = await axios.get(url);
        generateText(res.data)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }

}

let text = process.argv[2];
let path = process.argv[3];

if (text === 'file') {
    fileText(path);
} else if (text === 'url') {
    urlText(path);
} else {
    console.error(`Unknown path: ${path}`);
    process.exit(1);
}

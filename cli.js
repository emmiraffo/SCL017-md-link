#! /usr/bin/env node
const mdLinks = require('./src/index.js');

console.log(process.argv[2])

mdLinks(process.argv[2]).then((f)=> {
    console.log("then", f)
}).catch((e) => {
    console.log("catch del error", e)
})
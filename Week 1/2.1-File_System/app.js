const fs = require("fs");

fs.writeFileSync("text.txt", "file");
fs.copyFileSync("text.txt", "copy.txt");
fs.renameSync("text.txt", "original.txt");
const list = fs.readdirSync("./");
console.log(list);
fs.appendFileSync("copy.txt", "\nthis is the copy");

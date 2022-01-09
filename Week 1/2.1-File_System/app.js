const fs = require("fs");

fs.writeFileSync("text.txt", "file");
fs.copyFileSync("text.txt", "copy.txt");
fs.renameSync("text.txt", "original.txt");
const list = fs.readdirSync("./");
fs.appendFileSync("copy.txt", `\n${list}`);

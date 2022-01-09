//! What is the difference between import and require?
// One of the major differences between require() and import()
// is that require() can be called from anywhere inside the program
// whereas import() cannot be called conditionally, it always runs at the beginning of the file.

//! How can you enable using the import syntax using node js
// Save the file with .mjs extension
// or add { "type": "module" } in the nearest package.json.

//!
import * as fs from "fs";

fs.writeFileSync("text.txt", "Test");

import add, { changeName, hello } from "./importFile.mjs";
const sum = add(2, 4);
const newName = changeName("Leo");
console.log(sum);
console.log(newName);
hello();

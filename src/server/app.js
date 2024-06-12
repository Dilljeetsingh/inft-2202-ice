console.log("Hello World");

import {readJsonFile} from "./utils/readJsonFile.js";

const filename = 'data/animals.json';

const json = await readJsonFile(filename);

console.log(json);
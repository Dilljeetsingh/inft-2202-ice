import {readFile} from 'fs/promises';





export async function readJsonFile(filename) {
    try {
        const fileBuffer = await readFile(filename);
        // console.log(fileBuffer);
        const fileString = fileBuffer.toString();
        // console.log(fileString);
        const fileJsonReal = JSON.parse(fileString);
        // console.log(fileJsonReal[0].name);
        return fileJsonReal;
    }catch (error) {
        console.log('woops', error);
    }
}
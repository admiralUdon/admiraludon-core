import { readFileSync } from 'fs-extra';
import { join } from 'path';

export function readSQLFile(dirPath, fileName) {
    try {        
        const filePath = join(dirPath, fileName);
        const sqlContent = readFileSync(filePath, 'utf-8');
        return sqlContent;
    } catch (err) {
        console.error('Error reading SQL file:', err);
        return null;
    }
}
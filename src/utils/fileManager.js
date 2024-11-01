import fs from 'fs';
import path from 'path';
import { PATHS } from '../config/config.js';
import { connectDB } from '../config/db.js';
import { logInfo } from './logger.js';

export function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }
}

export function saveScreenshot(page, filename) {
    const screenshotsDir = path.resolve(process.cwd(), PATHS.screenshots);
    ensureDirectoryExistence(screenshotsDir);

    return page.screenshot({ path: path.join(screenshotsDir, filename) });
}

export async function saveDataToDB(data, collectionName) {
    try {
        const db = await connectDB();
        await db.collection(collectionName).insertMany(data);
        logInfo(`Dados inseridos na coleção: ${collectionName}`);
    } catch (error) {
        console.error('Erro ao inserir dados no banco de dados:', error);
    }
}
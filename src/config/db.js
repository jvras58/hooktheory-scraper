import { MongoClient } from 'mongodb';
import { URLS } from './config.js';

const client = new MongoClient(URLS.mongoDB);
let dbInstance = null;

export async function connectDB() {
    if (!dbInstance) {
        await client.connect();
        dbInstance = client.db('hooktheory-scraper');
    }
    return dbInstance;
}

export async function closeDB() {
    if (dbInstance) {
        await client.close();
        dbInstance = null;
    }
}
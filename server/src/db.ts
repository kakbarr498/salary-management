import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'data', 'salary.db');
const db = new (Database as any)(dbPath);

export default db;

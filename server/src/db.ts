import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'data', 'salary.db');
const db = new Database(dbPath);

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      country TEXT NOT NULL,
      salary REAL NOT NULL,
      email TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export default db;

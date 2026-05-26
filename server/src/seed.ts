import fs from 'fs';
import path from 'path';
import db from './db';

function readLines(file: string) {
  return fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8').split(/\r?\n/).filter(Boolean);
}

function randomChoice<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed(count = 10000) {
  const first = readLines('first_names.txt');
  const last = readLines('last_names.txt');
  const countries = ['USA', 'India', 'UK', 'Germany', 'Canada', 'Australia'];
  const titles = ['Software Engineer', 'Senior Software Engineer', 'Manager', 'Director', 'HR Specialist', 'Accountant'];

  const insert = db.prepare('INSERT INTO employees (first_name,last_name,job_title,country,salary,email) VALUES (?,?,?,?,?,?)');
  const insertMany = db.transaction((rows: any[]) => {
    for (const r of rows) insert.run(r.first, r.last, r.title, r.country, r.salary, r.email);
  });

  const batchSize = 1000;
  for (let i = 0; i < count; i += batchSize) {
    const rows: any[] = [];
    const upper = Math.min(i + batchSize, count);
    for (let j = i; j < upper; j++) {
      const firstName = randomChoice(first);
      const lastName = randomChoice(last);
      const country = randomChoice(countries);
      const title = randomChoice(titles);
      const salary = Math.round((Math.random() * 120000 + 30000) * 100) / 100;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      rows.push({ first: firstName, last: lastName, title, country, salary, email });
    }
    insertMany(rows);
    console.log(`Inserted ${Math.min(upper, count)} / ${count}`);
  }
}

if (require.main === module) {
  seed().then(() => console.log('Seeding done')).catch((e) => console.error(e));
}

export default seed;

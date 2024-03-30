const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  // Read SQL file
  const createTableSql = fs.readFileSync(path.join(__dirname, 'create_schema.sql'), 'utf-8');

  // Execute SQL file
  try {
    await pool.query(createTableSql);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table', err);
    process.exit(1);
  }

  await pool.end();

  // Insert products
  require('./insert-products');
}

main();

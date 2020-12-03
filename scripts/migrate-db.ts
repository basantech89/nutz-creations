const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
  }
})

console.log(
  process.env.MYSQL_HOST,
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  process.env.MYSQL_PORT,
  db
)

async function query(q) {
  try {
    console.log('query', q)
    const results = await db.query(q)
    console.log('result', results)
    // db.query(q).then((x) => console.log('x', x))
    await db.end()
    console.log('db', db)
    return results
  } catch (e) {
    console.log('error', e.message)
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`CREATE TYPE team AS (
      name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL
    )`)

    console.log('here')

    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30),
      email VARCHAR(128) NOT NULL,
      password VARCHAR(60) NOT NULL,
      company_name VARCHAR(30) NOT NULL,
      company_type VARCHAR(30),
      incorporated_in VARCHAR(30),
      regulated_by VARCHAR(30),
      address TEXT,
      customer_data_type VARCHAR(30) NOT NULL,
      hosted_on VARCHAR(30) NOT NULL,
      standard_baseline VARCHAR(30),
      ciso team,
      dpo team,
      internal_security_team team[],
      internal_audit_team team[],
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at
        TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    await query(`SELECT * FROM test2`)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate()
  .then(() => process.exit())
  .catch((e) => console.log(e.message))

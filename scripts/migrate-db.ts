import { config } from 'dotenv'
import path from 'path'
import mysql from 'serverless-mysql'

const envPath = path.resolve(process.cwd(), '.env.local')
console.log({ envPath })
config({ path: envPath })

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  }
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
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
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30),
      email VARCHAR(128) NOT NULL,
      password VARCHAR(60) NOT NULL,
      company_name VARCHAR(30),
      company_type VARCHAR(30),
      incorporated_in VARCHAR(30),
      regulated_by VARCHAR(30),      
      address TEXT,
      customer_data_type VARCHAR(30),
      hosted_on VARCHAR(30),
      standard_baseline VARCHAR(30),
      ciso_name VARCHAR(30),
      ciso_email VARCHAR(128),
      dep_name VARCHAR(30),
      dpo_email VARCHAR(128),
      internal_security_team team,
      internal_audit_team team,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())

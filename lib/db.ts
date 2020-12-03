import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT)
  }
})

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    console.log('query and values', q, values)
    const results = await db.query(q, values)
    console.log('db results', results)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
    database: process.env.PGDATABASE || 'mydb',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
})

export default pool
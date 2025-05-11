import pool from "./db.js";

const client = await pool.connect();
const documentTableName = 'documents'

try {
    // Check if the vector extension is installed
    await client.query(`CREATE EXTENSION IF NOT EXISTS vector`)

    // Check if the documents table exists
    const result = await client.query(`SELECT to_regclass('${documentTableName}') IS NOT NULL AS exists;`)

    if (!result.rows[0].exists) {
        await client.query(`
            CREATE TABLE ${documentTableName} (
                id SERIAL PRIMARY KEY,
                content TEXT,
                embedding vector(768)
            )
        `)
        console.log('✅ documents Table created.')
    }
    else {
        console.log('✅ documents Table already exists.')
    }
} catch (err) {
    console.error('❌ Migration', err)
} finally {
    client.release()
    await pool.end()
}
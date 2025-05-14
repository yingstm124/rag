import pool from "./db.js";
import {dimensions} from "./config.js";

const migrateDocuments = async() => {
    const client = await pool.connect();
    const documentTableName = 'documents'

    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS vector`)
        const result = await client.query(`SELECT to_regclass('${documentTableName}') IS NOT NULL AS exists;`)
        const existing = result.rows[0].exists
        if (!existing) {
            await client.query(`
                CREATE TABLE ${documentTableName} (
                    id SERIAL PRIMARY KEY,
                    content TEXT,
                    embedding vector(${dimensions})
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
}


migrateDocuments()


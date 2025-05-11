import pool from "./db.js";
import { embed } from "./transformer.js";
import ollama from "ollama";

async function searchSimilar(queryText, k = 3) {
    const vector = await embed(queryText);
    const vectorString = "[" + vector.join(",") + "]";
    const { rows } = await pool.query(
      `SELECT content, embedding <=> $1::vector AS score
       FROM documents
       ORDER BY score ASC
       LIMIT $2`,
      [vectorString, k]
    );
    return rows;
}

const question = 'Hi!!';
const docs = await searchSimilar(question, 3);
const context = docs.map(d => d.content).join('\n');
const res = await ollama.chat({
    model: 'llama3.2:1b',
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Answer the question based on the context:\n\n${context}\n\nQuestion: ${question}` }
    ]
})


console.log('🤖', res.message.content);
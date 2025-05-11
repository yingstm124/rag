import pool from './db.js'
import { embed } from './transformer.js';

const documents = [
    "Mycos Technologies values integrity and transparency, offering honest advice, accountable resources, and clear pricing.",
    "Nook is employee, Position: Software Engineer, Department: IT, Skills: .NET, React, PostgreSQL, Docker.",
    "Jane Doe is employee, Position: QA Engineer, Department: Quality Assurance, Skills: Manual Testing, Cypress, Jira.",
    "John Smith is employee, Position: Frontend Developer, Department: UI/UX, Skills: Angular, HTML, CSS, TypeScript.",
    "Alice Tan is employee, Position: Backend Developer, Department: Development, Skills: Node.js, Express, MongoDB.",
    "Mark Lee is employee, Position: Project Manager, Department: Operations, Skills: Agile, Scrum, Trello, MS Project."
]

for(const content of documents){
    const vector = await embed(content);
    try {
        const vectorString = "[" + vector.join(",") + "]";
        await pool.query(
            'INSERT INTO documents (content, embedding) VALUES ($1, $2)',
            [content, vectorString]
        );
        console.log(`✅ Added: ${vectorString}`);
    } catch (err) {
        console.error('❌ Error inserting document:', err);
    }
}

process.exit();
# RAG mini project

### install
- Node 20+

### How to setup & run

#### Create .env 
<pre>POSTGRES_DB=__YOUR_DB__
POSTGRES_USER=__USER__
POSTGRES_PASSWORD=__PASSWORD__
</pre>

#### open terminal and run docker build
<pre>docker compose up -d --build</pre>

#### node install
<pre>npm i</pre>

#### pull model
<pre>ollama pull llama3.2:1b</pre>

#### pull embedding
<pre>ollama pull nomic-embed-text</pre>

#### migrate create user and init table for vector database
<pre>npm run migrate</pre>

#### insert embbed Document to database
<pre>npm run addDocs</pre>

#### run this project
<pre>npm start</pre>
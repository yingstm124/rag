import ollama from "ollama";

export async function embed(text) {
    const res = await ollama.embeddings({
        model: 'nomic-embed-text',
        dimensions: 768,
        prompt: text
    })
    return res.embedding
}
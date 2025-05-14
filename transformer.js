import ollama from "ollama";
import {dimensions} from "./config.js";

ollama.baseURL = "http://localhost:" + process.env.OLLAMAPORT; // or your custom address if needed

export async function embed(text) {
    const res = await ollama.embeddings({
        model: 'nomic-embed-text:latest',
        prompt: text
    })
    return res.embedding
}
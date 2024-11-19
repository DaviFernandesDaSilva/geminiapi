import express from "express";
import readline from "readline";
const app = express();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fazerPergunta(query) {
    return new Promise((resolve) => {
      leitor.question(query, (answer) => {
        resolve(answer);
        leitor.close();
      });
    });
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = await fazerPergunta('Digite uma pergunta:  ');
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log(" - " + prompt)

    const lines = text.split('\n');
    lines.forEach((line) => {
        console.log(line);
        });
}
  
run();
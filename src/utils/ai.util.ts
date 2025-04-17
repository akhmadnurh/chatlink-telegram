import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../configs/env";
import { handleError } from "./error.util";

const genAI = new GoogleGenerativeAI(env.GEMINI.API_KEY);

export const model = genAI.getGenerativeModel({ model: env.GEMINI.MODEL });

export const correctGrammar = async (text: string): Promise<string> => {
  const prompt = `You are an English tutor bot. Correct any grammatical mistakes in this sentence, do not provide any explanation and answer the question: ${text}`;

  try {
    const result = await model.generateContent(prompt);

    return `Corrected: ${result.response.text()}`;
  } catch (error) {
    return `Sorry, I couldn't process your request. Please try again later.`;
  }
};

export const generateResponse = async (text: string): Promise<string> => {
  const prompt = `You are a normal chatbot. Generate a helpful, interactive, and natural response based on it: ${text}`;

  try {
    const result = await model.generateContent(prompt);

    return `Response: ${result.response.text()}`;
  } catch (error) {
    return `Sorry, I couldn't process your request. Please try again later.`;
  }
};

export const utils = {
  correctGrammar,
  generateResponse,
};

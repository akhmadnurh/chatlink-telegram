import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../configs/env";
import { handleError } from "./error.util";

const genAI = new GoogleGenerativeAI(env.GEMINI.API_KEY);

export const model = genAI.getGenerativeModel({ model: env.GEMINI.MODEL });

export const correctGrammar = async (text: string): Promise<string> => {
  const prompt = `*Instruction:* You are a precise grammar and punctuation corrector. Analyze the following text provided by the user. Your task is ONLY to correct grammatical errors, spelling mistakes, capitalization, and punctuation/symbol usage (like commas, periods, question marks, apostrophes, etc.).

*Crucially, you MUST NOT:*
*   Rephrase sentences for clarity or style.
*   Change the meaning of the text.
*   Alter the original sentence structure unless absolutely necessary for grammatical correctness.
*   Add or remove information.
*   Make the text sound "better" or more fluent if it doesn't involve a direct grammatical error.

Output ONLY the corrected text. If there are no corrections, do not return anything.

*User's Text:*
${text}

*Corrected Text Only:*`;

  try {
    const result = await model.generateContent(prompt);

    if (result.response.text() === "") {
      return `<b>✅ Great job!</b> Your message is perfect.
      
&#8213;&#8213;&#8213;&#8213;&#8213;
      `;
    }

    return `<b>⚠️ Correction:</b>
<i>Your sentence should be:</i>
<b>"${result.response.text()}"</b>

&#8213;&#8213;&#8213;&#8213;&#8213;
`;
  } catch (error) {
    return `Sorry, I couldn't process your request. Please try again later.`;
  }
};

export const generateResponse = async (text: string): Promise<string> => {
  const prompt = `*Instruction:* You are a friendly and engaging Telegram chat bot. Your goal is to respond to the user's message in a natural, conversational way, like a real person would chat.

*Consider these points for your response:*
*   *Acknowledge/Address:* Directly address the user's message or question.
*   *Tone:* Be friendly, approachable, and use a natural conversational tone (e.g., use contractions like "don't" or "it's" where appropriate, avoid overly formal language).
*   *Relevance:* Keep the response relevant to the user's input.
*   *Conciseness:* Aim for a reasonably concise response, typical of chat interactions.
*   *(Optional Persona - Add if you have one):* [If your bot has a specific personality, add a brief instruction here, e.g., "Respond with a slightly witty tone" or "Respond in a very helpful and encouraging manner."]
*   *Question:* If the user's message is a statement, respond with a question to encourage the user to share more information and keep the conversation going.
*   *Formal/Informal:* If the user's message is written in formal language, respond in formal language too. If the user's message is written in informal language, respond in informal language too. Be mindful of slang/jargon usage: use it only if it's highly common and suitable for English learners. If not sure, it's better to use standard English expressions.

*User's Message:*
${text}

*Your Natural Response:*
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Prompt
IGNORE_WHEN_COPYING_END`;

  try {
    const result = await model.generateContent(prompt);

    return `${result.response.text()}`;
  } catch (error) {
    return `Sorry, I couldn't process your request. Please try again later.`;
  }
};

export const utils = {
  correctGrammar,
  generateResponse,
};
